import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import priceRoutes from "./routes/price.route";
import alertRoutes from "./routes/alert.route";
import { config } from "./utils/config";
import { checkAlerts } from "./services/Alert.service";
import {
  cachePrices,
  fetchCryptoPrices,
  savePricesToDB,
} from "./services/price.service";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

// Routes
app.use("/api", priceRoutes);
app.use("/api", alertRoutes);

// Fetch and update prices every minute, and check alerts
setInterval(async () => {
  try {
    const prices = await fetchCryptoPrices();
    await savePricesToDB(prices);
    await cachePrices(prices);
    await checkAlerts(); // Check alerts after updating prices
  } catch (err) {
    console.error("Error updating prices or checking alerts:", err);
  }
}, 60000); // 60 seconds

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
