import { Request, Response } from "express";
import ListAllCartsService from "../../services/Cart/listAllCarts.service";
import { getToken } from "../../utils/getToken.utils";

class ListAllCartsController {
  async handle(req: Request, res: Response) {
    try {
      const headers = req.headers.authorization;

      const listAllCartsService = new ListAllCartsService();

      if (!headers) {
        return res.status(401).json({ message: "Missing Authorization Token" });
      }

      const data = await listAllCartsService.execute();

      res.status(200).json({
        data: data,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default ListAllCartsController;
