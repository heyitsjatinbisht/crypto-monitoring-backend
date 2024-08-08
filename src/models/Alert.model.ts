import mongoose, { Schema, Document } from "mongoose";

interface AlertDocument extends Document {
  symbol: string;
  threshold: number;
  direction: string;
}

const alertSchema = new Schema<AlertDocument>({
  symbol: { type: String, required: true },
  threshold: { type: Number, required: true },
  direction: { type: String, required: true },
});

export const Alert = mongoose.model<AlertDocument>("Alert", alertSchema);
