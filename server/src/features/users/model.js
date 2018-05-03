import mongoose from "mongoose";
// import { validate } from "../../auth/validate";

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
    minlength: [5, "5 character minumum"],
    maxlength: [20, "Username character can't exceed 20 character"],
    required: [true, "Username required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      isAsync: true,
      validator: function(value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(value).toLowerCase());
      },
      message: "{VALUE} is not a valid email address"
    }
  },
  password: {
    type: String
  }
});

export default User;
