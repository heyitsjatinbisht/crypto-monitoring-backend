import axios from "axios";
import { Price } from "../models/Price.model";
import { config } from "../utils/config";
import redisClient from "../utils/redisClient";

// Type definition for price data
interface PriceData {
  symbol: string;
  price: number;
}

// Fetch cryptocurrency prices from API
export const fetchCryptoPrices = async (): Promise<PriceData[]> => {
  try {
    const { data } = await axios.get(config.coingeckoAPI);

    return [
      { symbol: "bitcoin", price: data.bitcoin.usd },
      { symbol: "ethereum", price: data.ethereum.usd },
    ];
  } catch (error) {
    console.error("Error fetching cryptocurrency prices:", error);
    return [];
  }
};

// Save prices to MongoDB
export const savePricesToDB = async (prices: PriceData[]) => {
  try {
    await Price.deleteMany({}); // Optionally clear existing prices
    const priceDocuments = prices.map((price) => new Price(price));
    await Price.insertMany(priceDocuments);
    console.log("Prices saved to MongoDB");
  } catch (error) {
    console.error("Error saving prices to MongoDB:", error);
  }
};

// Cache prices in Redis
export const cachePrices = async (prices: PriceData[]) => {
  try {
    const multi = redisClient.multi();
    prices.forEach((price) => {
      multi.set(price.symbol, JSON.stringify(price));
    });
    await multi.exec();
    console.log("Prices cached in Redis");
  } catch (error) {
    console.error("Error caching prices in Redis:", error);
  }
};

// Get cached price from Redis
export const getCachedPrice = async (
  symbol: string
): Promise<PriceData | null> => {
  try {
    const data = await redisClient.get(symbol);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving cached price from Redis:", error);
    return null;
  }
};
