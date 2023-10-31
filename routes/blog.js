import express from "express";
import {
    authorBlogController,
    createBlogController,
    detailBlogController,
    getAllBlogController,
    updateBlogController,
    uploadImageBlog,
} from "../controllers/blogController.js";
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

const storageImage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blog",
    },
});

const photoMiddleware = multer({ storage: storageImage })

const router = express.Router();

router.get("/", getAllBlogController);

router.get("/:blogId", detailBlogController)

router.put("/:blogId", updateBlogController);

router.get("/author/:authorId", authorBlogController);

router.post("/", createBlogController);

router.post("/upload", photoMiddleware.array('blog', 100), uploadImageBlog);

export default router;