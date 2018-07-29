import jwt from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/jsonwebtoken";
import _ from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/lodash";
import bcrypt from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/bcrypt";

export const createTokens = async (user, SECRET, SECRET_2) => {
  // verify: need secret | user me for authentication
  // decode: no secret | user me on the client side
  const createToken = jwt.sign(
    {
      user: _.pick(user, ["_id", "name"])
    },
    SECRET,
    {
      expiresIn: "1d"
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, ["_id", "name"])
    },
    SECRET_2,
    {
      expiresIn: "7d"
    }
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (
  token,
  refreshToken,
  models,
  SECRET,
  SECRET_2
) => {
  let userId = 0;

  try {
    const {
      user: { _id }
    } = jwt.decode(refreshToken);

    userId = _id;
  } catch (error) {
    console.log("refreshTokens", error);
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findById(userId);

  if (!user) {
    return {};
  }

  const refreshTokenSecret = user.password + SECRET_2;

  try {
    jwt.verify(refreshToken, refreshTokenSecret);
  } catch (error) {
    console.log("refreshTokens", error);
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshTokenSecret
  );

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  };
};

export const tryLogin = async (email, password, models, SECRET, SECRET_2) => {
  let user = await models.User.find({ email: email });
  user = user[0];

  if (!user) {
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
