import { Schema } from "mongoose";
import { IPaymentDetails } from "@/types/customers/orders/paymentDetails";
import { PaymentMethod, PaymentStatus } from "@/types/enum/enumExports";
import { CurrencyEnum } from "@/types/enum/country/countryCurrencyEnum";

const paymentDetails = new Schema<IPaymentDetails>({
  method: {
    type: String,
    required: true,
    enum: Object.values(PaymentMethod),
  },
  transactionID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: Object.values(CurrencyEnum),
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(PaymentStatus),
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isTest: {
    type: Boolean,
    default: false,
  },
});

export default paymentDetails;
