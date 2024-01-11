import express from "express";
import authAuthorizeAdmin from "../middleware/authAuthorizeAdmin.js";
import {
    getBlogDataController,
    getBookingDataController,
    getPlaceDataController,
    getUserDataController
} from "../controllers/dataController.js";

const router = express.Router();

router.use(authAuthorizeAdmin)

router.get("/user", getUserDataController);

router.get("/place", getPlaceDataController);

router.get("/booking", getBookingDataController)

router.get("/blog", getBlogDataController)

export default router