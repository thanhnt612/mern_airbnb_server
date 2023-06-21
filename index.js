import express from 'express'
import cors from 'cors';
import user from './routes/user.js'
import place from './routes/place.js'
import booking from './routes/booking.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;

app.use(express.json())
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/user', user);
app.use('/place', place);
app.use('/booking', booking);

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

app.post('/upload-source', photoMiddleware.array('picture', 100), async (req, res) => {
  const uploadFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path } = req.files[i];
    uploadFiles.push(path);
  }
  res.status(200).json({
    message: 'upload success',
    content: uploadFiles
  })
})

mongoose
  .connect(URL)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });