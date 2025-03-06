import mongoose, { Document, Schema } from "mongoose";
import { IOrder } from "@/types/user/customer/orderInterface";
import {
  ShippingStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/types/enum/enumExports";

const orderSchema = new Schema<IOrder & Document>({
  orderNumber: { type: String, required: true },
  orderDate: { type: Date, required: true },
  orderStatus: {
    type: String,
    required: true,
    enum: Object.values(ShippingStatus),
    default: ShippingStatus.PENDING,
  },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  orderTotal: { type: Number, required: true },
  orderItemCurr: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: "CxUser" },
  orderPaymentMethod: {
    type: String,
    required: true,
    enum: Object.values(PaymentMethod),
  },
  orderPaymentStatus: {
    type: String,
    required: true,
    enum: Object.values(PaymentStatus),
  },
});

const Order =
  (mongoose.models.Order as mongoose.Model<IOrder & Document>) ||
  mongoose.model<IOrder & Document>("Order", orderSchema);

export default Order;
