import { Request, Response } from "express";
import ListProductsByIDService from "../../services/Products/listProductById.service";


class ListProductByIdController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const listProductService = new ListProductsByIDService();

      const Product = await listProductService.execute({ id });

      res.status(200).json(Product.seralize());
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default ListProductByIdController;
