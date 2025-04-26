import jsonwebtoken from "jsonwebtoken";
const generateAccessToken = (user) => {
  const token = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "5h",
  });
  return token;
};
export default generateAccessToken;
