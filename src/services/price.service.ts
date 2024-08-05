import axios from "axios";
import { Price } from "../models/Price.model";
import { getAsync, setAsync } from "../utils/redisClient";
import { config } from "../utils/config";

export const fetchCryptoPrices = async () => {
  const { data } = await axios.get(config.coingeckoAPI);
  return [
    { symbol: "bitcoin", price: data.bitcoin.usd },
    { symbol: "ethereum", price: data.ethereum.usd },
  ];
};

export const savePricesToDB = async (prices: any) => {
  for (const price of prices) {
    const newPrice = new Price(price);
    await newPrice.save();
  }
};

export const cachePrices = async (prices: any) => {
  for (const price of prices) {
    await setAsync(price.symbol, JSON.stringify(price));
  }
};

export const getCachedPrice = async (symbol: string) => {
  const data = await getAsync(symbol);
  return data ? JSON.parse(data) : null;
};
