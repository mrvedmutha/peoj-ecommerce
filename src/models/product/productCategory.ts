import mongoose, { Document, Schema } from "mongoose";
import { IProductCategory } from "@/types/product/productCategoryInterface";

const productCategorySchema = new Schema<IProductCategory & Document>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subCategory: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }],
  createAt: { type: Date, default: Date.now },
});

const ProductCategory =
  (mongoose.models.ProductCategory as mongoose.Model<
    IProductCategory & Document
  >) ||
  mongoose.model<IProductCategory & Document>(
    "ProductCategory",
    productCategorySchema
  );

export default ProductCategory;
