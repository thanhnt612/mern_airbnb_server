import express from "express";
import { bookingRoomController, getBookingGuestController } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:guestId", getBookingGuestController);

router.post("/", bookingRoomController);

export default router;
