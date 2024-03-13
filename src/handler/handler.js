import { reviewModel } from "../../database/models/review.model.js";
import { catchError } from "../middleware/catchError.js";

export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    if (model === reviewModel) {
      const document = await model.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      if (document !== null) {
        res.json({ message: "Deleted Successfully", document });
      } else {
        res.status(404).json("No document Found here");
      }
    } else {
      const document = await model.findByIdAndDelete(req.params.id);
      if (document !== null) {
        res.json({ message: "Deleted Successfully", document });
      } else {
        res.status(404).json("No document Found");
      }
    }
  });
};


export const getSingleOne = (model) => {
  return catchError(async (req, res, next) => {
    const document = await model.findById(req.params.id);
    !document && res.status(404).json("No document Found");
    document && res.json({ message: "success", document });
  });
};
