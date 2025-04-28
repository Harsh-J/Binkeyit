import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  uploadAvatar,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", auth, logoutUser);
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
export default userRouter;
