import express from "express";
import {
    OwnerRoomController,
    checkStatusRoomController,
    createRoomController,
    destinationController,
    detailRoomController,
    getAllRoomController,
    updateRoomController,
    uploadImagePlace
} from "../controllers/placeController.js";

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import * as dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.API_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "place",
    },
});

const photoMiddleware = multer({ storage: storage })

const router = express.Router();

router.get("/", getAllRoomController);

router.put("/:roomId", updateRoomController);

router.get("/check", checkStatusRoomController)

router.get("/:roomId", detailRoomController);

router.get("/owner/:ownerId", OwnerRoomController);

router.get("/dest/:dest", destinationController);

router.post("/", createRoomController);

router.post("/upload", photoMiddleware.array('picture', 100), uploadImagePlace)

export default router;
