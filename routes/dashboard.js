import express from "express";
import {
    getBlogDashboardController,
    getBookingDashboardController,
    getPlaceDashboardController,
    getUserDashboardController
} from "../controllers/dashBoardController.js";
import authAuthorizeAdmin from "../middleware/authAuthorizeAdmin.js";

const router = express.Router();

router.use(authAuthorizeAdmin)

router.get("/user", getUserDashboardController);

router.get("/place", getPlaceDashboardController);

router.get("/booking", getBookingDashboardController)

router.get("/blog", getBlogDashboardController)

export default router;