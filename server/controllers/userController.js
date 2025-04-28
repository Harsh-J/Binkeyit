import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/imageUploadCloudinary.js";
import { request } from "express";

export const registerUser = async (req, res) => {
  console.log("inside regigsterUser");
  //name,email,password
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name,email,password!!",
        error: true,
        success: false,
      });
    }

    //find a user with this email
    const alreadyExistingUser = await UserModel.findOne({ email });
    if (alreadyExistingUser) {
      return res.status(400).json({
        message: "email already registered",
        error: true,
        success: false,
      });
    }

    //if all three present we can hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save in db
    const payload = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = await UserModel.create(payload);
    //const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`;
    // const verifyEmail = await sendEmail({
    //   sendTo: email,
    //   subject: "Verification email from Binkeyit",
    //   html: verifyEmailTemplate({
    //     name,
    //     url: verifyEmailUrl,
    //   }),
    // });
    // console.log(verifyEmail)
    return res.json({
      message: "User registered Successfully",
      error: false,
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if this email exists
    if (!email || !password) {
      return res.status(400).json({
        message: "please provide email and password",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not registered",
        error: true,
        success: false,
      });
    }
    //email is present now check the activeness of user or the status
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Account no longer active",
        error: true,
        success: false,
      });
    }

    //account active now check password correction
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).json({
        message: "Invalid Credentials",
        error: true,
        success: false,
      });
    }
    //password also matched , generate access token and refresh token
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    //set cookies
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);
    return res.status(200).json({
      message: "Login successfull",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const logoutUser = async (req, res) => {
  try {
    //remove cookies from request object
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    };
    res.cookie("accessToken", "", cookieOption);
    res.cookie("refreshToken", "", cookieOption);

    //remove refreshToken from db for this user which will come from req object
    const removeRefreshToken = await UserModel.updateOne(
      { _id: req.user.id },
      {
        refresh_token: "",
      }
    );

    //finally send repsonse
    return res.status(200).json({
      message: "Logout Successfully!!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export async function uploadAvatar(req, res) {
  try {
    const image = req.file;
    const user = req.user;
    const upload = await uploadImageCloudinary(image);
    //find user and update avatar filed
    const updatedAvatar = await UserModel.updateOne(
      { _id: user.id },
      {
        avatar: upload.url,
      }
    );
    if (updatedAvatar.modifiedCount === 0) {
      return res.status(400).json({
        message: "avatar db updated failed",
        error: true,
        success: false,
      });
    }
    return res.json({
      message: "profile updated",
      error: false,
      success: true,
      data: upload.url,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function updateUserDetails(request, response) {
  try {
    const userId = request.user.id; //auth middleware
    const { name, email, mobile, password } = request.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return response.json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
