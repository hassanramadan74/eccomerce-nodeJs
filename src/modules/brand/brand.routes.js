import express from "express";
import { validation } from "../../middleware/validation.js";
import { addBrandVal, paramsVal, updateBrandVal } from "./brand.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js";
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "./brand.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";

const brandRouter = express.Router();

brandRouter
.route('/')
.post(protectedRoutes,allowedTo('user' , 'admin'),uploadSingleFile('logo'),validation(addBrandVal),addBrand)
.get(getAllBrands)


brandRouter
.route('/:id')
.put(protectedRoutes,uploadSingleFile('logo'),validation(updateBrandVal),updateBrand)
.delete(protectedRoutes,validation(paramsVal),deleteBrand)
.get(validation(paramsVal),getSingleBrand)






export default brandRouter