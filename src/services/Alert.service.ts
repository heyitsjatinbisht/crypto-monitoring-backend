import { Alert } from "../models/Alert.model";
import { fetchCryptoPrices, getCachedPrice } from "./price.service";

export const setAlert = async (
  userId: string,
  symbol: string,
  threshold: number,
  direction: string
) => {
  const alert = new Alert({ userId, symbol, threshold, direction });
  await alert.save();
};

export const checkAlerts = async () => {
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
        // Send notification logic here
      } else if (
        alert.direction === "below" &&
        currentPrice < alert.threshold
      ) {
        console.log(
          `Alert for user ${alert.userId}: ${alert.symbol} price is below ${alert.threshold}`
        );
        // Send notification logic here
      }
    }
  }
};
