import { getCustomRepository } from "typeorm";
import Product from "../../entities/Product";
import { CartRepository } from "../../repositories/cart.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";

interface ICartProps {
  cart: {
    id: string;
    owner: {
      id: string;
      name: string;
    };
  };
  closedProducts: Product[];
}

class GetAllClosedPurchasesService {
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
        },
        closedProducts: [],
      };

      Carts.push(serialize);
    }

    for (let product in productCarts) {
      let productCart = productCarts[product];
      for (let cart in Carts) {
        if (productCart.cart.id === Carts[cart].cart.id) {
          if (productCart.status === "Closed") {
            Carts[cart].closedProducts.push(productCart.product);
          }
        }
      }
    }
    return Carts;
  }
}

export default GetAllClosedPurchasesService;
