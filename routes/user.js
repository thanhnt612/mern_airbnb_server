import express from "express";
import {
  createUserController,
  loginUserController,
  updateUserController,
  deleteUserController,
  getUserController,
  uploadImageAvatar,
  profileUserController,
  logoutUserController,
  refreshTokenController,
  profileAvatarController,
  createAvatarController,
  verifyAccountController,
  createTokenVerifyController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/userController.js";

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import * as dotenv from 'dotenv'
import authMiddleware from "../middleware/authMiddleware.js";


dotenv.config()

cloudinary.config({
  cloud_name: process.env.API_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatar",
  },
});

const photoMiddleware = multer({ storage: storage })

const router = express.Router();

router.get("/", getUserController);

router.put("/update/:id", updateUserController);

router.delete("/delete/:id", deleteUserController);

router.get("/profile", authMiddleware, profileUserController);

router.get("/avatar/:profileId", profileAvatarController);

router.post("/register", createUserController);

router.post("/login", loginUserController);

router.get("/confirm/:token", verifyAccountController)

router.post("/verify/:id", createTokenVerifyController)

router.post('/refresh', refreshTokenController)

router.post("/logout", logoutUserController)

router.post("/upload-avatar", photoMiddleware.single('avatar'), uploadImageAvatar)

router.post("/avatar", createAvatarController)

router.post("/forgot-password", forgotPasswordController)

router.post("/reset-password", resetPasswordController)

export default router;
