import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";
import { cashOrderVal } from "./order.validation.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getSpecificOrder } from "./order.controller.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(protectedRoutes, allowedTo("user", "admin"), getSpecificOrder);

  orderRouter.get('/all' , getAllOrders)
orderRouter
  .route("/:id")
  .post(
    protectedRoutes,
    allowedTo("user", "admin"),
    validation(cashOrderVal),
    createCashOrder
  );

  orderRouter.post('/checkOut/:id',protectedRoutes,allowedTo("user", "admin"),createCheckoutSession);


export default orderRouter;
