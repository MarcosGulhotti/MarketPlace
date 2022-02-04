import { Request, Response } from "express";
import LoginUserService from "../../services/Users/login.service";

class LoginUserController {
  async handle(req: Request, resp: Response) {
    try {
      const { email, password } = req.body;

      const loginUserService = new LoginUserService();

      const userToken = await loginUserService.execute({ email, password });

      return resp.status(200).json({ token: userToken });
    } catch (error) {
      return resp.status(401).json({ message: (error as any).message });
    }
  }
}

export default LoginUserController;
