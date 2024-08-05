import { Schema, model } from "mongoose";

const PriceSchema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Price = model("Price", PriceSchema);
