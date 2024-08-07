import { Alert } from "../models/Alert.model";
import { fetchCryptoPrices } from "./price.service";

// Function to set a new alert
export const setAlert = async (
  userId: string,
  symbol: string,
  threshold: number,
  direction: string
) => {
  try {
    const alert = new Alert({ userId, symbol, threshold, direction });
    await alert.save();
    console.log(
      `Alert set for user ${userId}: ${symbol} ${direction} ${threshold}`
    );
  } catch (error) {
    console.error("Error setting alert:", error);
  }
};

// Function to check all alerts against the latest crypto prices
export const checkAlerts = async () => {
  try {
    const alerts = await Alert.find();
    const prices = await fetchCryptoPrices();

    for (const alert of alerts) {
      const priceData = prices.find((p) => p.symbol === alert.symbol);
      if (priceData) {
        const currentPrice = priceData.price;

        if (alert.direction === "above" && currentPrice > alert.threshold) {
          console.log(
            `Alert for user ${alert.userId}: ${alert.symbol} price is above ${alert.threshold}`
          );
          // Example: Send notification
          // sendNotification(alert.userId, alert.symbol, currentPrice, alert.threshold);
        } else if (
          alert.direction === "below" &&
          currentPrice < alert.threshold
        ) {
          console.log(
            `Alert for user ${alert.userId}: ${alert.symbol} price is below ${alert.threshold}`
          );
          // Example: Send notification
          // sendNotification(alert.userId, alert.symbol, currentPrice, alert.threshold);
        }
      }
    }
  } catch (error) {
    console.error("Error checking alerts:", error);
  }
};
