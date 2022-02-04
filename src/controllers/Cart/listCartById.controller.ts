import { Request, Response } from "express";
import Cart from "../../entities/Cart";
import ListCartByIdService from "../../services/Cart/listCartById.service";
import { IUserProps } from "../../types/user.types";
import { getToken } from "../../utils/getToken.utils";

class ListCartByIdController {
  async handle(req: Request, res: Response) {
    try {
      const headers = req.headers.authorization;
      const { id } = req.params;

      const listCartByIdService = new ListCartByIdService();

      if (!headers) {
        return res.status(401).json({ message: "Missing Authorization Token" });
      }

      const userToken: IUserProps = getToken(headers);
      const cartId = id;

      const data = await listCartByIdService.execute({ cartId, userToken });
      const products = data.allProducts;
      const cart: Cart = data.userCart;

      res.status(200).json({ cart: {
        id: cart.id,
        owner: {
          id: cart.owner.id,
          name: cart.owner.name,
        },
        products: products
      } });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default ListCartByIdController;
