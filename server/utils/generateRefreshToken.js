import jsonwebtoken from "jsonwebtoken";
const generateRefreshAccessToken = (user) => {
  const token = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};
export default generateRefreshAccessToken;
