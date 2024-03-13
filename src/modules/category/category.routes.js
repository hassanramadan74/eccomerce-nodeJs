import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryVal, paramsVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { protectedRoutes } from "../auth/auth.controllers.js";

const categoryRouter = express.Router();

categoryRouter.use("/:categoryID/subcategories",subCategoryRouter)
categoryRouter
.route('/')
.post(protectedRoutes,uploadSingleFile('img'),validation(addCategoryVal),addCategory)
.get(getAllCategories)


categoryRouter
.route('/:id')
.put(protectedRoutes,uploadSingleFile('img'),validation(updateCategoryVal),updateCategory)
.delete(protectedRoutes,validation(paramsVal),deleteCategory)
.get(validation(paramsVal),getSingleCategory)






export default categoryRouter
