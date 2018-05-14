import mongoose from "mongoose";

const Skill = new mongoose.Schema({
  skill_name: {
    type: String
  },
  skill_level: {
    type: Number
  }
});

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
    required: [true, "Username required"],
    minlength: [4, "4 character minumum"],
    maxlength: [20, "Username character can't exceed 20 character"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: function(value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(value).toLowerCase());
      },
      message: "{VALUE} is not a valid email address"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  skills: {
    type: [Skill]
  }
});

export default User;
