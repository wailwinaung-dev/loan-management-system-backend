import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import borrowerRoutes from './routes/borrowerRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(borrowerRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

export {app, server}; // Default export