import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../../repositories/user.repository";
import { JWTConfig } from "../../database/jwt.config";

interface Ilogin {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: Ilogin) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Missing e-mail");
    } else if (!password) {
      throw new Error("Missing Password");
    }

    const user = await usersRepository.findOne({ email });

    if (user === undefined) {
      throw new Error("User Not Exist");
    }

    try {
      const match = await bcrypt.compare(password, user.password);

      const token = jwt.sign({ user }, JWTConfig.secret, {
        expiresIn: JWTConfig.expiresIn,
      });

      if (match) {
        return token;
      } else {
        throw new Error("Password and Email missmatch");
      }
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}

export default LoginUserService;