import { Schema } from "mongoose";
import { IProductPriceDetails } from "@/types/product/productPriceDetailsInterface";

const productPriceDetailsSchema = new Schema<IProductPriceDetails>({
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  isBaseCurrency: { type: Boolean, required: true },
});

export default productPriceDetailsSchema;
