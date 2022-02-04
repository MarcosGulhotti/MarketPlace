import { getCustomRepository } from "typeorm";
import Cart from "../../entities/Cart";
import Product from "../../entities/Product";
import ProductCart from "../../entities/ProductCart";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";
import { ProductRepository } from "../../repositories/products.repository";
import { IUserProps } from "../../types/user.types";

interface IlistCartById {
  cartId: string;
  userToken: IUserProps;
}

class ListCartByIdService {
  async execute({ cartId, userToken }: IlistCartById) {
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const cartRepository = getCustomRepository(CartRepository);

    const userCart = await cartRepository.findOne({ id: cartId });

    if (!userCart) {
      throw new Error("Cart Doesn't Exists");
    }
    if (!userToken.isAdm) {
      if (userToken.id !== userCart.owner.id) {
        throw new Error("You Can't list others users cart");
      }
    }
    const userProductCart = await productCartRepository.find({
      where: { cart: userCart.id },
    });

    const allProducts = [];
    for (let prod in userProductCart) {
      const product: Product = userProductCart[prod].product;
      if (userProductCart[prod].status === "Pending") {
        allProducts.push(product);
      }
    }
    return { allProducts, userCart };
  }
}

export default ListCartByIdService;
