import { EntityRepository, Repository } from "typeorm";
import Cart from "../entities/Cart";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {}

export { CartRepository };
