import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/user.model.js";
const generateRefreshAccessToken = async (user) => {
  const token = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });
  //update refresh token in user as well
  const updateRefreshToken = await UserModel.updateOne(
    { _id: user.id },
    {
      refresh_token: token,
    }
  );

  if (updateRefreshToken.modifiedCount === 0) {
    throw new Error("refresh token is not set for current user");
  }
  return token;
};
export default generateRefreshAccessToken;
