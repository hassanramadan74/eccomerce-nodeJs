import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://nodecoursestudent:XLnCcg9WAihtVVTg@cluster0.a8xguk9.mongodb.net/Eccomerce")
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log("Something went wrong", e);
    });
};
