import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";
import { addAddress, getAllAddresses, removeAddress } from "./address.controller.js";
import { addAddressVal, paramsVal } from "./address.validation.js";


const addressRouter = express.Router();

addressRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addAddressVal),addAddress)
.get(protectedRoutes,allowedTo('user'),getAllAddresses)


addressRouter
.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsVal),removeAddress)






export default addressRouter