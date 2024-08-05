import redis from "redis";
import { config } from "./config";
import { promisify } from "util";

const redisClient = redis.createClient({
  url: config.redisURL,
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

export { redisClient, getAsync, setAsync };
