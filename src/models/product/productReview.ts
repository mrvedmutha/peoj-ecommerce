import mongoose, { Schema, Document } from "mongoose";
import { IProductReview } from "@/types/product/productReviewInterface";

const productReviewSchema = new Schema<IProductReview & Document>({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "CxUser" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVerifedPurchase: { type: Boolean, default: false },
});

const Review =
  (mongoose.models.Review as mongoose.Model<IProductReview & Document>) ||
  mongoose.model<IProductReview & Document>("Review", productReviewSchema);

export default Review;
