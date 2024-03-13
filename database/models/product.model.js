import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short product name"],
      maxLength: [200, "product name too long"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: [10, "too short product description"],
      maxLength: [2000, "product name too description"],
    },
    imgCover: String,
    images: [],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 1,
    },
    sold: Number,
    rateAvg: {
      type: Number,
      max: 5,
      min: 0,
    },
    rateCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

schema.post("init", function (doc) {
  if (doc.imgCover)
    doc.imgCover = "http://localhost:3000/" + "uploads/" + doc.imgCover;
  if (doc.images)
    doc.images = doc.images.map(
      (img) => "http://localhost:3000/" + "uploads/" + img
    );
});
schema.virtual("myReviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
  justOne: true,
});
schema.pre("findOne", function () {
  this.populate("myReviews");
});
export const productModel = mongoose.model("product", schema);
