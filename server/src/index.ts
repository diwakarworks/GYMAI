import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { planRouter } from './routes/plan';
import { profileRouter } from './routes/profile';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;




app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});