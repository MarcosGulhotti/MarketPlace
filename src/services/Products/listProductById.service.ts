import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../../repositories/products.repository";

interface IlistProductsByID {
  id: string;
}

class ListProductsByIDService {
  async execute({ id }: IlistProductsByID) {
    const productsByIDsRepository = getCustomRepository(ProductRepository);

    const Product = await productsByIDsRepository.findOne({ id });

    if (!Product) {
      throw new Error("Product Doesn't Exists");
    }

    return Product;
  }
}

export default ListProductsByIDService;