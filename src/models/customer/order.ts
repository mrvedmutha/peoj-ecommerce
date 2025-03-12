import mongoose, { Document, Schema } from "mongoose";
import { IOrder } from "@/types/customers/orders/orderInterface";
import orderItemsSchema from "@/Schemas/common/orderItemsSchema";
import paymentDetails from "@/Schemas/common/paymentDetailsSchema";
import shippingDetails from "@/Schemas/common/shippingDetailsSchema";

const orderSchema = new Schema<IOrder & Document>({
  orderNumber: { type: String, required: true },
  orderDate: { type: Date, required: true },
  customer: { type: Schema.Types.ObjectId, ref: "CxUser" },
  items: {
    type: [orderItemsSchema],
    required: true,
  },
  itemsCount: {
    type: Number,
    required: true,
  },
  orderTotal: { type: Number, required: true },
  orderItemCurr: { type: String, required: true },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  paymentDetails: {
    type: paymentDetails,
    //required: true, //TODO add or not?
  },
  shippingDetails: {
    type: shippingDetails,
    //required: true, //TODO add or not?
  },
});

const Order =
  (mongoose.models.Order as mongoose.Model<IOrder & Document>) ||
  mongoose.model<IOrder & Document>("Order", orderSchema);

export default Order;
