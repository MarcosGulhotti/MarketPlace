import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import ProductCart from "./ProductCart";
import User from "./User";

@Entity("cart")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  owner!: User;

  @OneToMany(() => ProductCart, (productCart) => productCart.cart)
  productCart!: ProductCart;
}
