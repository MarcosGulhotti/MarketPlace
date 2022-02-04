import { getCustomRepository } from "typeorm";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";
import { ProductRepository } from "../../repositories/products.repository";
import { IUserProps } from "../../types/user.types";

interface IDeleteProps {
  product_id: string;
  token: IUserProps;
}

class DeleteProductFromCartService {
  async execute({ product_id, token }: IDeleteProps) {
    const cartRepository = getCustomRepository(CartRepository);
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const userCart = await cartRepository.findOne({
      where: { owner: token.id },
    });
    const product = await productRepository.findOne(product_id);

    const productCart = await productCartRepository.findOne({
      where: { cart: userCart, product: product, status: "Pending" },
    });

    if (!userCart) {
      throw new Error("Cart Doesn't Exists");
    }

    if (!product || !productCart) {
      throw new Error("Product is not in Cart");
    }

    productCart.status = "Closed";

    await productCartRepository.save(productCart);

    return "Deleted";
  }
}

export default DeleteProductFromCartService;
