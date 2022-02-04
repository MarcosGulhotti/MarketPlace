import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import ProductCart from "./ProductCart";

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: "int" })
  price!: number;

  @Column({ default: null })
  completedPurchaseId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => ProductCart, (productCart) => productCart.product)
  productCart!: ProductCart;

  seralize(){
    return{
      id: this.id,
      name: this.name,
      price: this.price,
      createdAt: this.createdAt,
    }
  }

}
