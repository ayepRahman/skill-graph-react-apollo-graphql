import jwt from "jsonwebtoken";
import _ from "lodash";
import bcrypt from "bcrypt";

export const createTokens = async (user, SECRET, SECRET_2) => {
  // verify: need secret | user me for authentication
  // decode: no secret | user me on the client side
  const createToken = jwt.sign(
    {
      user: _.pick(user, ["_id"])
    },
    SECRET,
    {
      expiresIn: "1m"
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, ["_id"])
    },
    SECRET_2,
    {
      expiresIn: "7d"
    }
  );

  return [createToken, createRefreshToken];
};

export const tryLogin = async (email, password, User, SECRET, SECRET_2) => {
  const user = await User.where({ email: email });

  if (!user) {
    // throw new Error("Invalid Email");
    return {
      ok: false,
      errors: [
        {
          path: "email",
          message: "No user with this email exists"
        }
      ]
    };
  }

  // comparing plaintext password with db.user.password which is a Hash password
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    // throw new Error("Invalid Password");

    return {
      ok: false,
      errors: [
        {
          path: "password",
          message: "Wrong password"
        }
      ]
    };
  }

  const refreshTokenSecret = user.password + SECRET_2;

  const [token, refreshToken] = await createTokens(
    user,
    SECRET,
    refreshTokenSecret
  );

  return {
    ok: true,
    token,
    refreshToken
  };
};
