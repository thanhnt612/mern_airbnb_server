import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import user from './routes/user.js'
import place from './routes/place.js'
import booking from './routes/booking.js'
import blog from './routes/blog.js'
import dashboard from './routes/dashboard.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;

app.use(express.json())
app.use(cookieParser());
app.use(cors(
  {
    origin: [
      'https://traveldnd.netlify.app',
      'http://localhost:3000',
    ],
    credentials: true
  }
));

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/user', user);
app.use('/place', place);
app.use('/booking', booking);
// app.use('/dashboard', dashboard)
app.use('/blog', blog);

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