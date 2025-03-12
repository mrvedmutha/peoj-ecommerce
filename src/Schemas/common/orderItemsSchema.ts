import { IOrderItem } from "@/types/customers/orders/orderItemInterface";
import { Schema } from "mongoose";
import { CurrencyEnum } from "@/types/enum/country/countryCurrencyEnum";

const orderItemsSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: {
    type: String,
    required: true,
    enum: Object.values(CurrencyEnum),
  },
});

export default orderItemsSchema;
