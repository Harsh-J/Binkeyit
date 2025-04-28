import jsonwebtoken from "jsonwebtoken";
const auth = (req, res, next) => {
  //token either from cookie or headers
  const token =
    req.cookies.accessToken || req.header.authorization.split("")[1];

  if (!token) {
    res.status(400).json({
      message: "Provide token",
      error: true,
      success: false,
    });
  }
  //if token present decode it and we will get user object from it
  const userFromToken = jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY
  );

  //set this user to req obj
  req.user = userFromToken;

  next();
};
export default auth;
