import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiResponse";
import {
  fetchCryptoPrices,
  savePricesToDB,
  cachePrices,
  getCachedPrice,
} from "../services/price.service";

// Fetch and return the latest cryptocurrency prices
export const getPrices = asyncHandler(async (req: Request, res: Response) => {
  const prices = await fetchCryptoPrices();
  await savePricesToDB(prices);
  await cachePrices(prices);
  res.status(200).json(new ApiResponse(200, prices));
});

// Get cached price for a specific cryptocurrency
export const getCachedPriceController = asyncHandler(
  async (req: Request, res: Response) => {
    const { symbol } = req.params;
    const cachedPrice = await getCachedPrice(symbol);

    if (!cachedPrice) {
      throw new ApiError(404, `Price for ${symbol} not found in cache`);
    }

    res.status(200).json(new ApiResponse(200, cachedPrice));
  }
);
