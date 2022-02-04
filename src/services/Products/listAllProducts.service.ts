import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../../repositories/products.repository";

class ListAllProductsService {
  async execute() {
    const productsByIDsRepository = getCustomRepository(ProductRepository);

    const Product = await productsByIDsRepository.find();

    const allProducts = [];

    for (let prod in Product) {
      allProducts.push(Product[prod].seralize());
    }

    return allProducts;
  }
}

export default ListAllProductsService;
