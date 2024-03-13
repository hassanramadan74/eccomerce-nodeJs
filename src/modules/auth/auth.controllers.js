import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";

//sign up
const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();
  let token = jwt.sign({ email: req.body.email  ,_id: user._id}, "ayPassword");
  res.json({ message: "success", token });
});

//sign in
const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ _id: user._id, email: user.email }, "ayPassword");
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

//change password
const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ _id: user._id, email: user.email }, "ayPassword");
    await userModel.findByIdAndUpdate(req.user._id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});


//authentication
const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("please login first", 401));

  let decoded = jwt.verify(token, "ayPassword");
  console.log(decoded);
  let user = await userModel.findById(decoded._id);
  if (!user) return next(new AppError("user not found", 401));
  if (user?.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getTime() / 1000);
    if (time > decoded.iat)
      return next(new AppError("invalid token ... login again"));
  }
  req.user = user;
  next();
});



//authorization
const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))return next(new AppError("you are not authorized to preform this action", 403));
    next()
  });
};

export { signup, signin, changePassword, protectedRoutes, allowedTo };
