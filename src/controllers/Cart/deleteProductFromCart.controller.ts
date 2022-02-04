import { Request, Response } from "express";
import DeleteProductFromCartService from "../../services/Cart/deleteProductFromCart.service";
import { getToken } from "../../utils/getToken.utils";

class DeleteProductFromCartController {
  async handle(req: Request, res: Response) {
    try {
      const { product_id } = req.params;
      const headers = req.headers.authorization;
      if (!headers) {
        return res.status(401).json({ message: "Missing Authorization Token" });
      }
      const token = getToken(headers);

      const deleteProduct = new DeleteProductFromCartService();

      await deleteProduct.execute({ product_id, token });

      return res.status(204).json("Deleted");
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default DeleteProductFromCartController;
