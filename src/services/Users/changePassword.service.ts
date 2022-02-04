import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { IUserProps } from "../../types/user.types";
import bcrypt from "bcrypt";

class ChangePasswordService {
  async execute(userId: IUserProps, code: string, newPassword: string) {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(userId.id);

    if (!user) {
      throw new Error("User not exists");
    }

    if (
      user.resetPasswordExpires === null ||
      user.resetPasswordCode === "invalid"
    ) {
      throw new Error("Code invalid");
    }
    if (user.resetPasswordCode !== code) {
      throw new Error("Code missmatch");
    }

    let now = new Date();
    let expires = new Date(user.resetPasswordExpires);
    if (now > expires) {
      throw new Error("Code is invalid");
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetPasswordCode = "invalid";

    await userRepository.save(user);

    return user;
  }
}

export default ChangePasswordService;
