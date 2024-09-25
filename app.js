import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import tradeRoutes from './routes/tradeRoutes.js';
import errorHandler from './utils/errorHandler.js';


dotenv.config(); 
const app = express();
app.use(express.json()); 
app.use('/api/trades', tradeRoutes);
app.use(errorHandler);
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
