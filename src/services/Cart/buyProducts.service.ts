import { getCustomRepository } from "typeorm";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";
import { ProductRepository } from "../../repositories/products.repository";
import { IUserProps } from "../../types/user.types";

class BuyProductsService {
  async execute(userToken: IUserProps) {
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const cartRepository = getCustomRepository(CartRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const userCart = await cartRepository.findOne({
      where: { owner: userToken.id },
    });

    if (!userCart) {
      throw new Error("Cart Doesn't Exists");
    }

    const allProducts = await productCartRepository.find({
      where: { cart: userCart, status: "Pending" },
    });

    const output = [];

    let total = 0;
    for (let product in allProducts) {
      total += allProducts[product].product.price;
      allProducts[product].status = "Closed";
      allProducts[product].product.completedPurchaseId =
        allProducts[product].id;
      await productCartRepository.save(allProducts[product]);
      output.push(allProducts[product].product);
    }

    return { output, total };
  }
}

export default BuyProductsService;
