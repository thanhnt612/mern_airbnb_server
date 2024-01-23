import express from "express";
import { 
    bookingRoomController, 
    deleteBookingController, 
    getBookingGuestController 
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:guestId", getBookingGuestController);

router.post("/", bookingRoomController);

router.post("/delete/:id", deleteBookingController);

export default router;
