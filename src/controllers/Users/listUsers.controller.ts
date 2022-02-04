import { Request, Response } from "express";
import ListUsersService from "../../services/Users/listUsers.service";

class ListAllUsersController {
  async handle(req: Request, res: Response) {
    try {
      const listUsersService = new ListUsersService();

      const users = await listUsersService.execute();

      return res.json({ data: users });
    } catch (error) {
      return res.status(401).json({ message: (error as any).message });
    }
  }
}

export default ListAllUsersController;
