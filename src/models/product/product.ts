import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "@/types/product/productInterface";

const productSchema = new Schema<IProduct & Document>({
  productName: { type: String, required: true },
  productDesc: { type: String, required: true },
  productShortDesc: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCurr: { type: String, required: true },
  productImages: [{ type: String, required: true }],
  productAttr: [{ type: Schema.Types.ObjectId, ref: "ProductAttr" }],
  productBrand: { type: Schema.Types.ObjectId, ref: "ProductBrand" },
  productCategory: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }],
  productTag: [{ type: String, required: true }],
  productDimensions: {
    length: { type: Number },
    breath: { type: Number },
    height: { type: Number },
    measurement: { type: String },
  },
  productWeight: {
    weight: { type: Number },
    measurement: { type: String },
  },
  productRating: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductRating",
    },
  ],
  stock: { type: Number, required: true },
  isStockAvailable: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
});

const Product =
  (mongoose.models.Product as mongoose.Model<IProduct & Document>) ||
  mongoose.model<IProduct & Document>("Product", productSchema);

export default Product;
