import express from 'express'
import cors from 'cors';
import user from './routes/user.js'
import place from './routes/place.js'
import booking from './routes/booking.js'

import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import imageDownloader from 'image-downloader'
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/', express.static(__dirname))


app.use(express.json())
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/user', user);
app.use('/place', place);
app.use('/booking', booking);


app.post('/upload-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName)
});


const photoMiddleware = multer({ dest: 'uploads' })

app.post('/upload-source', photoMiddleware.array('photos', 100), (req, res) => {
  const uploadFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const editFile = originalname.split('.');
    const ext = editFile[editFile.length - 1]
    const newFile = path + '.' + ext;
    fs.renameSync(path, newFile);
    uploadFiles.push(newFile.replace('uploads\\', ''))
  }
  res.json(uploadFiles)
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