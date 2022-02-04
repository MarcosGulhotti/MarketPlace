import { UsersRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { CartRepository } from "../../repositories/cart.repository";

interface IUser {
  email: string;
  password: string;
  name: string;
  isAdm: boolean;
}

class CreateUserService {
  async execute({ email, password, name, isAdm }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);
    const cartRepository = getCustomRepository(CartRepository);

    if (!email) {
      throw new Error("Missing Email");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("E-mail already registered");
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      isAdm,
    });

    const cart = cartRepository.create();

    await cartRepository.save(cart);
    await usersRepository.save(user);

    cart.owner = user;

    await cartRepository.save(cart);

    return user;
  }
}

export default CreateUserService;
