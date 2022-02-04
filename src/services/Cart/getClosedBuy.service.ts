import { getCustomRepository } from "typeorm";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";
import { ProductRepository } from "../../repositories/products.repository";
import { IUserProps } from "../../types/user.types";

class GetClosedBuyService {
  async execute(token: IUserProps, productId: string) {
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const cartRepository = getCustomRepository(CartRepository);

    const userCart = await cartRepository.findOne({
      where: { owner: token.id },
    });

    if (!userCart) {
      throw new Error("Cart Doesn't Exists");
    }

    const productCart = await productCartRepository.findOne({
      where: { id: productId, cart: userCart, status: "Closed" },
    });

    if (!productCart) {
      throw new Error("Purchase not exists");
    }
    productCart.product.completedPurchaseId = productCart?.id;

    await productRepository.save(productCart.product)

    if (!token.isAdm && productCart?.cart.owner !== userCart.owner) {
      throw new Error("You can't see others users carts");
    }

    return productCart;
  }
}

export default GetClosedBuyService;
