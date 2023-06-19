import express from "express";
import {
  createUserController,
  detailUserController,
  loginUserController,
  searchUserController,
  updateUserController,
  deleteUserController,
  getUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/search", searchUserController);

router.get("/", getUserController);

router.put("/update/:id", updateUserController);

router.delete("/delete/:id", deleteUserController);

router.get("/profile/:userId", detailUserController);

router.post("/login", loginUserController);

router.post("/register", createUserController);

export default router;
