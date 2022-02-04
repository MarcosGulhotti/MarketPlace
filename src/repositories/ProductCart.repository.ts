import { EntityRepository, Repository } from "typeorm";
import ProductCart from "../entities/ProductCart";

@EntityRepository(ProductCart)
class ProductCartRepository extends Repository<ProductCart> {}

export { ProductCartRepository };
