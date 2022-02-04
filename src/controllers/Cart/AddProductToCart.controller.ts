import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import Cart from "../../entities/Cart";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductRepository } from "../../repositories/products.repository";
import AddProductToCartService from "../../services/Cart/AddProductToCart.service";
import CreateProductService from "../../services/Products/createProduct.service";
import { IUserProps } from "../../types/user.types";
import { getToken } from "../../utils/getToken.utils";

class AddProductToCartController {
  async handle(req: Request, res: Response) {
    try {
      const headers = req.headers.authorization;
      const { product } = req.body;

      const productCartService = new AddProductToCartService();
      const cartRepository = getCustomRepository(CartRepository);
      const productRepository = getCustomRepository(ProductRepository);

      if (!headers) {
        return res.status(401).json({ message: "Missing Authorization Token" });
      }

      const token: IUserProps = getToken(headers);

      const cart = await cartRepository.findOne({
        where: { owner: token.id },
      });

      const productName = await productRepository.findOne({
        where: { name: product },
      });

      if (!cart) {
        throw new Error("Cart Doesn't Exists");
      }
      if (!productName) {
        throw new Error("Product Doesn't Exists");
      }

      // const productId = productName.id;
      // const cartId = cart.id;

      productCartService.execute({ productName, cart });

      const serializeData = {
        id: productName.id,
        name: productName.name,
        price: productName.price,
      };

      res
        .status(201)
        .json({ Sucess: "Product added to cart", product: serializeData });
    } catch (error) {
      res.status(400).json({ message: (error as any).message });
    }
  }
}

export default AddProductToCartController;
