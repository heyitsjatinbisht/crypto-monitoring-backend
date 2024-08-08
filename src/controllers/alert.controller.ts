import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { setAlert } from "../services/Alert.service";
import { Alert } from "../models/Alert.model";

// Set an alert for a cryptocurrency price threshold
export const createAlert = asyncHandler(async (req: Request, res: Response) => {
  const { symbol, threshold, direction } = req.body;

  if (!symbol || !threshold || !direction) {
    throw new ApiError(400, "Missing required fields");
  }

  await setAlert(symbol, threshold, direction);
  res
    .status(201)
    .json(new ApiResponse(201, null, "Alert created successfully"));
});

export const getAlerts = asyncHandler(async (req: Request, res: Response) => {
  const alerts = await Alert.find();
  res.status(200).json(new ApiResponse(200, alerts));
});
