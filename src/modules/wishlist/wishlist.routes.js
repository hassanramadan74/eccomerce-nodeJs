import express from "express";
import { addToWishlist, getAllWishlist, removeFromWishlist} from "./wishlist.controller.js";
import { validation } from "../../middleware/validation.js";
import {  addWishlistVal, paramsVal } from "./wishlist.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";


const wishlistRouter = express.Router();

wishlistRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addWishlistVal),addToWishlist)
.get(protectedRoutes,allowedTo('user'),getAllWishlist)


wishlistRouter
.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsVal),removeFromWishlist)






export default wishlistRouter