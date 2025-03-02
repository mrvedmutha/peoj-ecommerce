import mongoose, { Document, Schema } from "mongoose";
import { IProductBrand } from "@/types/product/productBrandInterface";

const productBrandSchema = new Schema<IProductBrand & Document>({
  brandName: { type: String, required: true },
  brandDesc: { type: String, required: true },
  brandLogo: { type: String, required: true },
});

const ProductBrand =
  (mongoose.models.ProductBrand as mongoose.Model<IProductBrand & Document>) ||
  mongoose.model<IProductBrand & Document>("ProductBrand", productBrandSchema);

export default ProductBrand;
