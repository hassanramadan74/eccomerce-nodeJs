import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";
import {
  addCart,
  applyCoupon,
  clearCart,
  getAllLoggedCart,
  removeFromCart,
  updateQuantity,
} from "./cart.controller.js";
import { addToCartVal, paramsVal, updateQTYVal } from "./cart.validation.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user" , 'admin'), validation(addToCartVal), addCart)
  .get(protectedRoutes, allowedTo("user" , 'admin'), getAllLoggedCart)
  .delete(protectedRoutes, allowedTo("user" , 'admin'), clearCart);

cartRouter
  .route("/:id")
  .delete(
    protectedRoutes,
    allowedTo("user", "admin"),
    validation(paramsVal),
    removeFromCart
  )
  .put(
    protectedRoutes,
    allowedTo("user" , 'admin'),
    validation(updateQTYVal),
    updateQuantity
  );

cartRouter.post(
  "/applyCoupon",
  protectedRoutes,
  allowedTo("user"),
  applyCoupon
);
export default cartRouter;
