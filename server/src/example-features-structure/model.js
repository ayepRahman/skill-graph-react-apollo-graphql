import mongoose from "mongoose";

const User = mongoose.model("User", {
  name: String
});

console.log("User model", User);

export default User;
