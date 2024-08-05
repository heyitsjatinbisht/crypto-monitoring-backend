import express from "express";
import mongoose from "mongoose";
import redis from "redis";
import { config } from "./utils/config";
import { PriceRoute } from "./routes/priceRoute";
import { AlertRoute } from "./routes/alertRoute";
import { checkAndTriggerAlerts } from "./services/alertService";

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Connect to Redis
const redisClient = redis.createClient(config.redisURL);
redisClient.on("connect", () => console.log("Redis client connected"));
redisClient.on("error", (err) => console.log("Redis error: ", err));

app.use(express.json());
app.use("/prices", PriceRoute);
app.use("/alerts", AlertRoute);

// Add periodic checking of alerts
setInterval(checkAndTriggerAlerts, 60000); // Check every minute

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
