import express from "express";
import { validation } from "../../middleware/validation.js";
import { addUserVal, paramsVal, updateUserVal } from "./user.validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { checkMail } from "../../middleware/emailExist.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";

const userRouter = express.Router();

userRouter
.route('/')
.post(validation(addUserVal),checkMail,addUser)
.get(getAllUsers)


userRouter
.route('/:id')
.put(validation(updateUserVal),updateUser)
.delete(validation(paramsVal),deleteUser)
.get(validation(paramsVal),getSingleUser)






export default userRouter