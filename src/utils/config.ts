import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "",

  coingeckoAPI: process.env.COINGECKO_API || "",
  password: process.env.password,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};
