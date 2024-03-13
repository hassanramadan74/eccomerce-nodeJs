import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OtteSP1nasSlN0OetsUMiB0oVeulcVsdYZu4VmpCrd1mYFdzvXamJMIw5RARjeN1oYYcVFWnckGRdM8PsM65QVD00J142I0px"
);
const createCashOrder = catchError(async (req, res, next) => {
  //get Cart
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart no found", 404));
  // total order price
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  //create order
  const order = new orderModel({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  console.log(order);
  await order.save();
  //increment sold & decrement quantity
  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
      },
    };
  });
  await productModel.bulkWrite(options);

  //clear cart

  await cartModel.findByIdAndDelete(req.params.id);

  res.json({ message: "success", order });
});

const getSpecificOrder = catchError(async (req, res, next) => {
  const order = await orderModel
    .findOne({ user: req.user._id })
    .populate("orderItems.product");
  if (!order) return next(new AppError("no order for this user", 404));
  res.json({ message: "success", order });
});

const getAllOrders = catchError(async (req, res, next) => {
  const order = await orderModel.findOne().populate("orderItems.product");
  if (!order) return next(new AppError("no orders", 404));
  res.json({ message: "success admin", order });
});

const createCheckoutSession = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("no cart found", 404));
  // total order price
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://dashboard.stripe.com/test/apikeys",
    cancel_url: "https://www.npmjs.com/package/stripe",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message: "success", session });
});
export {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  createCheckoutSession,
};