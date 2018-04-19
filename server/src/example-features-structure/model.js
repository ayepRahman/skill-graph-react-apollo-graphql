import mongoose from "mongoose";

const User = mongoose.model("User", {
  name: String
});

export default User;
