import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../../repositories/products.repository";

interface IProduct {
  name: string;
  price: number;
}

class CreateProductService {
  async execute({ name, price }: IProduct) {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = productsRepository.create({ name, price });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
