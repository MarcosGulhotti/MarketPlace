import { UsersRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { IUserProps } from "../../types/user.types";

interface IlistUser {
  id: string;
  token: IUserProps;
}

class ListUserByIdService {
  async execute({ id, token }: IlistUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ id });

    if (!user) {
      throw new Error("User Doesn't Exists");
    }
    if (!token.isAdm) {
      if (token.id !== id) {
        throw new Error("You Can't list others users");
      }
    }

    return user;
  }
}

export default ListUserByIdService;