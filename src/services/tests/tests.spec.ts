import { createConnection, getConnection, getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import CreateUserService from "../Users/createUser.service";
import ListUserByIdService from "../Users/listUserById.service";
import * as bcrypt from "bcryptjs";
import jwt_decode from "jwt-decode";
import LoginUserService from "../Users/login.service";
import { getToken, IJwtDecode } from "../../utils/getToken.utils";
import ListUserService from "../Users/listUsers.service";
import CreateProductService from "../Products/createProduct.service";
import ListProductsByIDService from "../Products/listProductById.service";
import ListAllProductsService from "../Products/listAllProducts.service";
import AddProductToCartService from "../Cart/AddProductToCart.service";
import { ProductRepository } from "../../repositories/products.repository";
import { ProductCartRepository } from "../../repositories/ProductCart.repository";
import ListCartByIdService from "../Cart/listCartById.service";
import { CartRepository } from "../../repositories/cart.repository";
import ListAllCartsService from "../Cart/listAllCarts.service";
import DeleteProductFromCartService from "../Cart/deleteProductFromCart.service";
import BuyProductsService from "../Cart/buyProducts.service";
import GetClosedBuyService from "../Cart/getClosedBuy.service";
import GetAllClosedPurchasesService from "../Cart/getAllClosedPurchases.service";
import SendEmailService from "../Users/sendEmail.service";
import SendResetPasswordCodeService from "../Users/sendResetPasswordCode.service";
import crypto from "crypto";
import ChangePasswordService from "../Users/changePassword.service";

describe("Users Test", () => {
  beforeAll(async () => {
    await createConnection();
  });
  afterAll(async () => {
    const defaultConnection = getConnection();
    await defaultConnection.close();
  });

  it("Should Create a user", async () => {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      email: "Teste@gmail.com",
      name: "testes",
      password: "testes",
      isAdm: false,
    });

    expect(user).toHaveProperty("id");
  });
  it("Should return a user by id", async () => {
    const listUserById = new ListUserByIdService();
    const login = new LoginUserService();
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: { email: "Teste@gmail.com" },
    });

    if (!user) {
      throw new Error("User not exists");
    }

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    const findUser = await listUserById.execute({
      id: user.id,
      token: userToken.user,
    });

    expect(findUser.id).toEqual(user.id);
  });
  it("Should list all users", async () => {
    const listAllUsers = new ListUserService();

    const allUsers = await listAllUsers.execute();

    expect(allUsers);
  });
  it("Should login", async () => {
    const login = new LoginUserService();
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: { email: "Teste@gmail.com" },
    });

    if (!user) {
      throw new Error("User not exists");
    }

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    expect(userToken.user.id).toMatch(user.id);
  });
  it("Should create a product", async () => {
    const createProduct = new CreateProductService();
    const listProducts = new ListProductsByIDService();

    const product = await createProduct.execute({
      name: "Produto teste",
      price: 10,
    });

    const listProduct = await listProducts.execute({ id: product.id });

    expect(product).toEqual(listProduct);
  });
  it("Should list a product by id", async () => {
    const createProduct = new CreateProductService();
    const listProducts = new ListProductsByIDService();

    const product = await createProduct.execute({
      name: "Produto teste id",
      price: 10,
    });

    const listProduct = await listProducts.execute({ id: product.id });

    expect(listProduct).toEqual(product);
  });
  it("Should list all products", async () => {
    const listAllProducts = new ListAllProductsService();

    const allProducts = await listAllProducts.execute();

    expect(allProducts);
  });
  it("Should add a product to cart", async () => {
    const createProduct = new CreateProductService();
    const login = new LoginUserService();
    const cartRepository = getCustomRepository(CartRepository);
    const productCartRepository = getCustomRepository(ProductCartRepository);

    const product = await createProduct.execute({
      name: "add to cart test",
      price: 10,
    });

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    const user = userToken.user;

    const cart = await cartRepository.findOne({ where: { owner: user.id } });

    if (!cart) {
      throw new Error("Cart Doesn't Exists");
    }

    const productCart = productCartRepository.create({
      status: "Pending",
      cart: cart,
      product: product,
    });

    expect(productCart.cart.id).toMatch(cart.id);
  });
  it("Shoul list user cart", async () => {
    const login = new LoginUserService();
    const cartRepository = getCustomRepository(CartRepository);
    const listCartById = new ListCartByIdService();

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    const user = userToken.user;

    const cart = await cartRepository.findOne({ where: { owner: user.id } });

    if (!cart) {
      throw new Error("Cart Doesn't Exists");
    }

    const list = await listCartById.execute({
      cartId: cart.id,
      userToken: userToken.user,
    });

    expect(list.userCart.id).toMatch(cart.id);
  });
  it("Should list all carts", async () => {
    const listAllcart = new ListAllCartsService();

    const allCarts = await listAllcart.execute();

    expect(allCarts);
  });
  it("Should delete item from cart", async () => {
    const createProduct = new CreateProductService();
    const login = new LoginUserService();
    const cartRepository = getCustomRepository(CartRepository);
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const deleteItemFromCart = new DeleteProductFromCartService();

    const product = await createProduct.execute({
      name: "delete test",
      price: 10,
    });

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    const user = userToken.user;

    const cart = await cartRepository.findOne({ where: { owner: user.id } });

    if (!cart) {
      throw new Error("Cart Doesn't Exists");
    }

    const productCart = productCartRepository.create({
      status: "Pending",
      cart: cart,
      product: product,
    });

    await productCartRepository.save(productCart);

    await deleteItemFromCart.execute({ product_id: product.id, token: user });

    const all = await productCartRepository.findOne(productCart.id);

    expect(all?.status).toBe("Closed");
  });
  it("Should buy itens from cart", async () => {
    const createProduct = new CreateProductService();
    const login = new LoginUserService();
    const cartRepository = getCustomRepository(CartRepository);
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const buyItens = new BuyProductsService();

    const product = await createProduct.execute({
      name: "buy test",
      price: 10,
    });

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    const user = userToken.user;

    const cart = await cartRepository.findOne({ where: { owner: user.id } });

    if (!cart) {
      throw new Error("Cart Doesn't Exists");
    }

    const productCart = productCartRepository.create({
      status: "Pending",
      cart: cart,
      product: product,
    });

    await productCartRepository.save(productCart);

    const buy = await buyItens.execute(user);

    expect(buy.output[0]).toHaveProperty("completedPurchaseId");
    expect(buy.total).toEqual(product.price);
  });
  it("Should list a closed purchase", async () => {
    const createProduct = new CreateProductService();
    const login = new LoginUserService();
    const cartRepository = getCustomRepository(CartRepository);
    const productCartRepository = getCustomRepository(ProductCartRepository);
    const buyItens = new BuyProductsService();

    const product = await createProduct.execute({
      name: "list closed test",
      price: 10,
    });

    const logged = await login.execute({
      email: "Teste@gmail.com",
      password: "testes",
    });
    const userToken: IJwtDecode = jwt_decode(logged);

    const user = userToken.user;

    const cart = await cartRepository.findOne({ where: { owner: user.id } });

    if (!cart) {
      throw new Error("Cart Doesn't Exists");
    }

    const productCart = productCartRepository.create({
      status: "Pending",
      cart: cart,
      product: product,
    });

    await productCartRepository.save(productCart);

    await buyItens.execute(user);

    const closed = await productCartRepository.findOne({
      where: { product: product, cart: cart, status: "Closed" },
    });

    await productCartRepository.save(productCart);

    if (!closed) {
      throw new Error("closed n exist");
    }

    expect(closed).toHaveProperty("status");
    expect(closed.status).toEqual("Closed");
  });
  it("Should return all closed purchases", async () => {
    const getAllClosedPurchasesService = new GetAllClosedPurchasesService();

    const allCloseds = await getAllClosedPurchasesService.execute();

    expect(allCloseds);
  });
  it("Should send a email to user", async () => {
    const usersRepository = getCustomRepository(UsersRepository);
    const login = new LoginUserService();
    const sendEmail = new SendEmailService();

    const createUserService = new CreateUserService();

    await createUserService.execute({
      email: "teste@mail.com",
      name: "testes",
      password: "testes",
      isAdm: false,
    });

    const logged = await login.execute({
      email: "teste@mail.com",
      password: "testes",
    });
    const decoded: IJwtDecode = jwt_decode(logged);

    const userToken = decoded.user;

    const user = await usersRepository.findOne({ where: { id: userToken.id } });

    if (!user) {
      throw new Error("User not exists");
    }

    const userID = user.id;
    const content = "testando aplicação";
    const title = "teste";
    const from = "tester";

    sendEmail.execute(userID, content, title, from);
  });
  it("Should sent a validation code to user's email", async () => {
    const usersRepository = getCustomRepository(UsersRepository);
    const login = new LoginUserService();
    const sendResetCode = new SendResetPasswordCodeService();

    const createUserService = new CreateUserService();

    await createUserService.execute({
      email: "user@email.com",
      name: "testes",
      password: "testes",
      isAdm: false,
    });

    const logged = await login.execute({
      email: "user@email.com",
      password: "testes",
    });
    const decoded: IJwtDecode = jwt_decode(logged);

    const userToken = decoded.user;

    const user = await usersRepository.findOne({ where: { id: userToken.id } });

    if (!user) {
      throw new Error("User not exists");
    }

    const randomCode = crypto.randomBytes(20).toString("hex");

    const sentCode = await sendResetCode.execute(user.id);

    let expires = new Date();
    expires.setHours(expires.getHours() + 1);

    user.resetPasswordCode = randomCode;
    user.resetPasswordExpires = expires;

    await usersRepository.save(user);

    expect(sentCode.message).toEqual("Code Send, valid for 1 hour");
  });
  it("Should change password", async () => {
    const usersRepository = getCustomRepository(UsersRepository);
    const login = new LoginUserService();
    const changePassword = new ChangePasswordService();

    const logged = await login.execute({
      email: "user@email.com",
      password: "testes",
    });
    const decoded: IJwtDecode = jwt_decode(logged);

    const userToken = decoded.user;

    const user = await usersRepository.findOne({ where: { id: userToken.id } });

    if (!user) {
      throw new Error("User not exists");
    }

    const oldPass = user?.password;

    const userId = user;
    const code = user.resetPasswordCode;
    const newPassword = "novasenha";

    const newUser = await changePassword.execute(userId, code, newPassword);

    expect(newUser.password).not.toEqual(oldPass);
  });
});
