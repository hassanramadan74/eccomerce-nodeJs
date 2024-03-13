import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

//update wishlist
const addToWishlist = catchError(async (req, res, next) => {
  const wishlist = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: req.body.product } },
      {
        new: true,
      }
    )
    .populate("wishlist");
  !wishlist && res.status(404).json("No wishlist Found");
  wishlist && res.json({ message: "success", wishlist: wishlist.wishlist });
});

const removeFromWishlist = catchError(async (req, res, next) => {
  const wishlist = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: req.params.id } },
      {
        new: true,
      }
    )
    .populate("wishlist");
  !wishlist && res.status(404).json("No wishlist Found");
  wishlist && res.json({ message: "success", wishlist: wishlist.wishlist });
});

const getAllWishlist = catchError(async (req, res, next) => {
  const {wishlist} = await userModel.findById(req.user._id).populate("wishlist");
  !wishlist && res.status(404).json("No wishlist Found");
  wishlist && res.json({ message: "success", wishlist });
});

export { addToWishlist, removeFromWishlist, getAllWishlist };
