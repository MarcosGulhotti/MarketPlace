import { Router } from "express";
import { JwtVerify } from "./middlewares/jwtValidation.middleware";
import { validate } from "./middlewares/schemaValidation.middleware";
import { verifyIfIsAdm } from "./middlewares/validateAdm.middleware";
import { UserSchema } from "./schemas/userSchema";

import CreateUserController from "./controllers/Users/createUser.controller";
import ListUserController from "./controllers/Users/listUserById.controller";
import LoginUserController from "./controllers/Users/loginUser.controller";
import ListAllUsersController from "./controllers/Users/listUsers.controller";

import CreateProductController from "./controllers/Products/createProduct.controller";
import ListProductByIdController from "./controllers/Products/listProductById.controller";
import ListAllProductsController from "./controllers/Products/listAllProducts.controller";
import AddProductToCartController from "./controllers/Cart/AddProductToCart.controller";
import ListCartByIdController from "./controllers/Cart/listCartById.controller";
import ListAllCartsController from "./controllers/Cart/listAllCarts.controller copy";
import DeleteProductFromCartController from "./controllers/Cart/deleteProductFromCart.controller";
import BuyProductsController from "./controllers/Cart/buyProducts.controller";
import GetClosedBuyController from "./controllers/Cart/getClosedBuy.controller";
import ListAllClosedPurchasesController from "./controllers/Cart/getAllClosedPurchases.controller";
import SendEmailController from "./controllers/Users/sendEmail.controller";
import SendResetPasswordCodeController from "./controllers/Users/sendResetPasswordCode.controller";
import ChangePasswordController from "./controllers/Users/changePassword.controller";

const router = Router();

// USER ROUTES

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const loginUserController = new LoginUserController();
const listAllUsersController = new ListAllUsersController();

router.post("/user", validate(UserSchema), createUserController.handle);
router.get("/user/:id", JwtVerify, listUserController.handle);
router.get("/user", JwtVerify, verifyIfIsAdm, listAllUsersController.handle);
router.post("/login", loginUserController.handle);

// PRODUCTS ROUTES

const createProductController = new CreateProductController();
const listProductByIdController = new ListProductByIdController();
const listAllProductsController = new ListAllProductsController();

router.post(
  "/product",
  JwtVerify,
  verifyIfIsAdm,
  createProductController.handle
);
router.get("/product/:id", listProductByIdController.handle);
router.get("/product", listAllProductsController.handle);

// Cart Routes

const addProductToCartController = new AddProductToCartController();
const listCartByIdController = new ListCartByIdController();
const listAllCartsController = new ListAllCartsController();
const deleteProductFromCartController = new DeleteProductFromCartController();
const buyProductsController = new BuyProductsController();
const getClosedBuyController = new GetClosedBuyController();
const listAllClosedPurchasesController = new ListAllClosedPurchasesController();
const sendEmailController = new SendEmailController();

router.post("/cart", JwtVerify, addProductToCartController.handle);
router.get("/cart/:id", JwtVerify, listCartByIdController.handle);
router.get("/cart", JwtVerify, verifyIfIsAdm, listAllCartsController.handle);
router.delete(
  "/cart/:product_id",
  JwtVerify,
  deleteProductFromCartController.handle
);
router.post("/buy", JwtVerify, buyProductsController.handle);
router.get("/buy/:id", JwtVerify, getClosedBuyController.handle);
router.get(
  "/buy",
  JwtVerify,
  verifyIfIsAdm,
  listAllClosedPurchasesController.handle
);
router.post("/email", JwtVerify, verifyIfIsAdm, sendEmailController.handle);

// RESET PASSWORD

const sendResetPasswordCodeController = new SendResetPasswordCodeController();
const changePasswordController = new ChangePasswordController();

router.post("/recuperar", JwtVerify, sendResetPasswordCodeController.handle);
router.post("/alterar_senha", JwtVerify, changePasswordController.handle);

export default router;
