import express from "express";
import {
    OwnerRoomController,
    createRoomController,
    destinationController,
    detailRoomController,
    getAllRoomController,
    updateRoomController
} from "../controllers/placeController.js";

const router = express.Router();

router.get("/", getAllRoomController);

router.put("/:roomId", updateRoomController);

router.get("/:roomId", detailRoomController);

router.get("/owner/:ownerId", OwnerRoomController);

router.get("/dest/:dest", destinationController);

router.post("/", createRoomController);



export default router;
