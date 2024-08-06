import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { setAlert } from "../services/Alert.service";

// Set an alert for a cryptocurrency price threshold
export const createAlert = asyncHandler(async (req: Request, res: Response) => {
  const { userId, symbol, threshold, direction } = req.body;

  if (!userId || !symbol || !threshold || !direction) {
    throw new ApiError(400, "Missing required fields");
  }

  await setAlert(userId, symbol, threshold, direction);
  res
    .status(201)
    .json(new ApiResponse(201, null, "Alert created successfully"));
});
