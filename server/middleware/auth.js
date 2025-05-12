import jsonwebtoken from "jsonwebtoken";
const auth = (req, res, next) => {
  //token either from cookie or headers

  const token =
    req.cookies.accessToken ||
    (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(400).json({
      message: "Authentication required. Please log in to continue.",
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

  req.userId = userFromToken.id;
  console.log("userId in auth middleware",req.userId)
  next();
};
export default auth;
