import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { CartRepository } from "../repositories/cart.repository";
import { ProductRepository } from "../repositories/products.repository";
import Cart from "./Cart";
import Product from "./Product";

@Entity("productCart")
export default class ProductCart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Cart, (cart) => cart.id, { eager: true })
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product!: Product;

  @Column()
  status!: "Pending" | "Closed";
}
