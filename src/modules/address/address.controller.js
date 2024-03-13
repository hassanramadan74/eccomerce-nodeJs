import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";


//update Address
const addAddress = catchError(async (req, res, next) => {
  const address = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { addresses: req.body} },
      {
        new: true,
      }
    )

  !address && res.status(404).json("No address Found");
  address && res.json({ message: "success", address: address.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
  const address = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: {_id:req.params.id} } },
      {
        new: true,
      }
    )

  !address && res.status(404).json("No wishlist Found");
  address && res.json({ message: "success", address: address.addresses });
});

const getAllAddresses = catchError(async (req, res, next) => {
  const {addresses} = await userModel.findById(req.user._id)
  addresses && res.json({ message: "success", addresses });
});

export { addAddress, removeAddress, getAllAddresses };
