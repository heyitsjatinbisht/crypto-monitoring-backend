import { Schema, model, Document } from "mongoose";

interface IAlert extends Document {
  userId: string;
  symbol: string;
  threshold: number;
  direction: "above" | "below"; // Adding the type for direction
}

const AlertSchema = new Schema<IAlert>({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  threshold: { type: Number, required: true },
  direction: { type: String, required: true, enum: ["above", "below"] }, // Enum for direction
});

export const Alert = model<IAlert>("Alert", AlertSchema);
