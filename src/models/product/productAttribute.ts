import mongoose, { Schema, Document } from "mongoose";
import { IProductAttr } from "@/types/product/productAttribute";

const productAttrSchema = new Schema<IProductAttr & Document>({
  attrName: { type: String, required: true },
  attrValue: [{ type: String, required: true }],
});

const ProductAttr =
  (mongoose.models.ProductAttr as mongoose.Model<IProductAttr & Document>) ||
  mongoose.model<IProductAttr & Document>("ProductAttr", productAttrSchema);

export default ProductAttr;
