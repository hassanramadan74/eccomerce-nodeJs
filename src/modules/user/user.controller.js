import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";
import { userModel } from "../../../database/models/user.model.js";

//add user
const addUser = catchError(async (req, res, next) => {
  const user = new userModel(req.body);
  await user.save();
  res.json({
    message: "user has been added",
    user: { name: user.name, email: user.email },
  });
});

//get all subCategories
const getAllUsers = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeature(userModel.find(), req.query)
    .fields()
    .filter()
    .sort()
    .pagination()
    .search();
  let users = await apiFeature.mongooseQuery;
  !users && res.status(404).json("No users Found");
  users && res.json({ message: "success", page: apiFeature.pageNumber, users });
});

// get single user
const getSingleUser = getSingleOne(userModel);

//update user
const updateUser = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !user && res.status(404).json("No user Found");
  user && res.json({ message: "success", user });
});

//delete User
const deleteUser = deleteOne(userModel);

export { addUser, getAllUsers, getSingleUser, updateUser, deleteUser };
