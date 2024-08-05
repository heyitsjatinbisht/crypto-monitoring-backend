import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "",
  redisURL: process.env.REDIS_URL || "",
  coingeckoAPI: process.env.COINGECKO_API || "",
};
