import express from "express";
import { validation } from "../../middleware/validation.js";
import { checkMail } from "../../middleware/emailExist.js";
import {
  changePasswordVal,
  signinSchemaVal,
  signupSchemaVal,
} from "./auth.validation.js";
import { changePassword, protectedRoutes, signin, signup } from "./auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", validation(signupSchemaVal), checkMail, signup);
authRouter.post("/signin", validation(signinSchemaVal), signin);
authRouter.patch(
  "/changePassword",
  protectedRoutes
  ,
  validation(changePasswordVal),
  changePassword
);

export default authRouter;
