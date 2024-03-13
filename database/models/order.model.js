import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        quantity: Number,
      },
    ],
    totalOrderPrice: Number,
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    deliveredAt: Date,
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    shippingAddress: {
      address: String,
      city: String,
      phone: String,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", schema);

// 

// 
