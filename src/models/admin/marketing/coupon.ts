import mongoose, { Schema, Document } from "mongoose";
import { ICoupon } from "@/types/admin/marketing/couponInterface";
import { CouponType } from "@/types/enum/enumExports";
import { boolean } from "zod";

const couponSchema = new Schema<ICoupon & Document>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(CouponType),
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  limit: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  specificCustomers: [
    {
      type: Schema.Types.ObjectId,
      ref: "CxUser",
    },
  ],
});

const Coupon =
  (mongoose.models.Coupon as mongoose.Model<ICoupon & Document>) ||
  mongoose.model<ICoupon & Document>("Coupon", couponSchema);

export default Coupon;
