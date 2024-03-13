import express from "express";
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview} from "./review.controller.js";
import { validation } from "../../middleware/validation.js";
import { addReviewVal, paramsVal, updateReviewVal } from "./review.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";


const reviewRouter = express.Router();

reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user' , 'admin'),validation(addReviewVal),addReview)
.get(getAllReviews)


reviewRouter
.route('/:id')
.put(protectedRoutes,allowedTo('user' , 'admin'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsVal),deleteReview)
.get(validation(paramsVal),getSingleReview)






export default reviewRouter