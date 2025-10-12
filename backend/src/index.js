import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public')); // Serve static files from the 'public' directory
app.use('/api/auth', authRoutes); 
app.use('/api/books', bookRoutes); // New book routes (make sure to create bookRoutes.js  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});