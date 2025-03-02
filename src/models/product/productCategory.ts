import mongoose, { Document, Schema } from "mongoose";
import { IProductCategory } from "@/types/product/productCategoryInterface";

const productCategorySchema = new Schema<IProductCategory & Document>({
  category: { type: String, required: true },
  categoryDesc: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
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
