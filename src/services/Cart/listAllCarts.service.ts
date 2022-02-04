import { getCustomRepository } from "typeorm";
import Cart from "../../entities/Cart";
import Product from "../../entities/Product";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";
import { UsersRepository } from "../../repositories/user.repository";
import { IUserProps } from "../../types/user.types";

interface ICartProps {
  cart: {
    id: string;
    owner: {
      id: string;
      name: string;
    };
    products: Product[];
  };
}

class ListAllCartsService {
  async execute() {
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const cartRepository = getCustomRepository(CartRepository);

    const productCarts = await productCartRepository.find();
    const allCarts = await cartRepository.find();

    const Carts: ICartProps[] = [];

    for (let cart in allCarts) {
      const newCart = allCarts[cart];

      const serialize = {
        cart: {
          id: newCart.id,
          owner: {
            id: newCart.owner.id,
            name: newCart.owner.name,
          },
          products: [],
        },
      };

      Carts.push(serialize);
    }

    for (let product in productCarts) {
      let productCart = productCarts[product];
      for (let cart in Carts) {
        if (productCart.cart.id === Carts[cart].cart.id) {
          if (productCart.status === "Pending") {
            Carts[cart].cart.products.push(productCart.product);
          }
        }
      }
    }

    return Carts;
  }
}

export default ListAllCartsService;
