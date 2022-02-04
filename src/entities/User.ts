import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  getCustomRepository,
} from "typeorm";
import bcrypt from "bcrypt";
import Cart from "./Cart";
import { CartRepository } from "../repositories/cart.repository";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdm!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: "invalid" })
  resetPasswordCode!: string | "invalid";

  @Column({ default: null })
  resetPasswordExpires!: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      isAdm: this.isAdm,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
