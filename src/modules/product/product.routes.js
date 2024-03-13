import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../services/fileUploads/fileUploads.js";
import {
  addProductVal,
  paramsVal,
  updateProductVal,
} from "../product/product.validation.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../product/product.controller.js";
import { protectedRoutes } from "../auth/auth.controllers.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(protectedRoutes,
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addProductVal),
    addProduct
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .put(protectedRoutes,
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateProductVal),
    updateProduct
  )
  .delete(protectedRoutes,validation(paramsVal), deleteProduct)
  .get(validation(paramsVal), getSingleProduct);

export default productRouter;
