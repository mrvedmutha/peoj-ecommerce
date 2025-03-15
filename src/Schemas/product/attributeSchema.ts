import {
  IProductAttr,
  IProductAttrVal,
} from "@/types/product/productAttribute";
import productPriceDetailsSchema from "@/Schemas/product/priceDetailSchema";
import { Schema } from "mongoose";

export const attributeValueSchema = new Schema<IProductAttrVal>({
  value: { type: String, required: true },
  sku: { type: String, required: true },
  priceDetails: [productPriceDetailsSchema],
});
export const attributeSchema = new Schema<IProductAttr>({
  name: { type: String, required: true },
  values: [attributeValueSchema],
});
