import mongoose, { Schema, Document } from "mongoose";
import { ICheckout } from "@/types/customers/checkoutInterface";
import paymentDetails from "@/Schemas/common/paymentDetailsSchema";
import { CheckoutStatus } from "@/types/enum/enumExports";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

const checkoutSchema = new Schema<ICheckout & Document>({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    default: null,
  },
  paymentDetails: {
    type: paymentDetails,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(CheckoutStatus),
    default: CheckoutStatus.PENDING,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    updatedAt: Date,
  },
});

const Checkout =
  (mongoose.models.Checkout as mongoose.Model<ICheckout & Document>) ||
  mongoose.model<ICheckout & Document>("Checkout", checkoutSchema);

export default Checkout;
