import { createClient } from "redis";
import { config } from "./config";

const redisClient = createClient({
  password: config.password,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Redis client connected");
})();

export default redisClient;
