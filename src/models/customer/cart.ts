import mongoose, { Schema, Document } from "mongoose";
import { CurrencyEnum } from "@/types/enum/country/countryCurrencyEnum";
import orderItemsSchema from "@/Schemas/common/orderItemsSchema";
import { ICart } from "@/types/customers/cartInterface";
const cartSchema = new Schema<ICart & Document>({
  products: {
    type: [orderItemsSchema],
    required: true,
    default: null,
  },
  totalValue: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    enum: Object.values(CurrencyEnum),
    default: null,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "ICxUser",
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  orderNote: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart =
  (mongoose.models.Order as mongoose.Model<ICart & Document>) ||
  mongoose.model<ICart & Document>("Cart", cartSchema);

export default Cart;
