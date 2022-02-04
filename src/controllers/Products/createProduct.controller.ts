import { Request, Response } from "express";
import CreateProductService from "../../services/Products/createProduct.service";

class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { name, price } = req.body;

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        price,
      });

      return res.status(201).json({ data: product.seralize() });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default CreateProductController;
