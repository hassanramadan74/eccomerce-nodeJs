import express from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSingleSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { validation } from "../../middleware/validation.js";
import { addSubCategoryVal, paramsVal, updateSubCategoryVal } from "./subcategory.validation.js";
import { protectedRoutes } from "../auth/auth.controllers.js";


const subCategoryRouter = express.Router({mergeParams:true});

subCategoryRouter
.route('/')
.post(protectedRoutes,validation(addSubCategoryVal),addSubCategory)
.get(getAllSubCategories)


subCategoryRouter
.route('/:id')
.put(protectedRoutes,validation(updateSubCategoryVal),updateSubCategory)
.delete(protectedRoutes,validation(paramsVal),deleteSubCategory)
.get(validation(paramsVal),getSingleSubCategory)






export default subCategoryRouter