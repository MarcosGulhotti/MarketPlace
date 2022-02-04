import { getCustomRepository } from "typeorm";
import Cart from "../../entities/Cart";
import Product from "../../entities/Product";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";

interface IProduct {
  productName: Product;
  cart: Cart;
}

class AddProductToCartService {
  async execute({ productName, cart }: IProduct) {
    const productsCartRepository = getCustomRepository(ProductCartRepository);

    const productCart = productsCartRepository.create({
      status: "Pending",
      cart: cart,
      product: productName,
    });

    await productsCartRepository.save(productCart);

    return productCart;
  }
}

export default AddProductToCartService;
