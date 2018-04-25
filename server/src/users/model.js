import mongoose from "mongoose";

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

export default User;
