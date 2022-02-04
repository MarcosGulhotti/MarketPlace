import { Request, Response } from "express";
import CreateUserService from "../../services/Users/createUser.service";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password, isAdm } = req.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
        isAdm,
      });

      return res.status(201).json({ data: user.serialize() });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default CreateUserController;
