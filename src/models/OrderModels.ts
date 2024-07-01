import mongoose, { Document, Schema } from "mongoose";

export interface IOrderProduct {
  _id: Schema.Types.ObjectId;
  title: string;
  quantity: number;
}

export interface IOrderBuyer {
  _id: Schema.Types.ObjectId;
  email: string;
}

export interface IOrder extends Document {
  createdAt: Date;
  totalAmount: number;
  product: IOrderProduct[];
  buyer: IOrderBuyer;
}

const OrderSchema = new Schema<IOrder>({
  totalAmount: { type: Number, required: true },
  product: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  buyer: {
    _id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export const OrderModels =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
