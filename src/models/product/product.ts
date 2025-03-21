import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "@/types/product/productInterface";
import productPriceDetailsSchema from "@/Schemas/product/priceDetailSchema";
import dimensionSchema from "@/Schemas/product/dimensionSchema";
import productSEODetailSchema from "@/Schemas/product/seoDetailSchema";
import { attributeSchema } from "@/Schemas/product/attributeSchema";
const productSchema = new Schema<IProduct & Document>({
  title: { type: String, required: true },
  alias: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  sku: { type: String },
  images: [{ type: String }],
  priceDetails: { type: [productPriceDetailsSchema] },
  taxDetails: {
    isTax: { type: Boolean },
    tax: { type: Schema.Types.ObjectId, ref: "Tax" },
  },
  cogs: { type: Number },
  profit: { type: Number },
  margin: { type: Number },
  package: { type: dimensionSchema },
  metafields: {
    type: productSEODetailSchema,
  },
  stock: {
    isAvailable: { type: Boolean },
    quantity: { type: Number },
  },
  category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  brand: { type: Schema.Types.ObjectId, ref: "ProductBrand" },
  slug: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  attributes: { type: [attributeSchema] },
  tags: [{ type: String }],
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product =
  (mongoose.models.Product as mongoose.Model<IProduct & Document>) ||
  mongoose.model<IProduct & Document>("Product", productSchema);

export default Product;
