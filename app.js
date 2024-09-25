import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import errorHandler from "./utils/errorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/trades", tradeRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.on("error", (error) => {
  console.log(`Error occurred: ${error}`);
  throw error;
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to the database: ${error}`);
    process.exit(1);
  });
