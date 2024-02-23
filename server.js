import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import home from './routes/home.js'
import user from './routes/user.js'
import place from './routes/place.js'
import booking from './routes/booking.js'
import blog from './routes/blog.js'
import data from './routes/data.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;

//Middleware
app.use(express.json())
app.use(cookieParser());
// app.use(cors(
//   {
//     origin: ['https://traveldnd.netlify.app', 'http://localhost:3000'],
//     credentials: true
//   }
// ));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://traveldnd.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});
// app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

//Routes
app.use('/', home);
app.use('/place', place);
app.use('/user', user);
app.use('/booking', booking);
app.use('/blog', blog);
app.use('/dashboard', data)

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