import { Request, Response } from "express";
import ListAllProductsService from "../../services/Products/listAllProducts.service";

class ListAllProductsController {
  async handle(req: Request, res: Response) {
    try {
      const listProductService = new ListAllProductsService();

      const data = await listProductService.execute();

      res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default ListAllProductsController;
