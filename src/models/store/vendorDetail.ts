import mongoose, { Schema, Document } from "mongoose";
import { IVendor } from "@/types/store/vendorInterface";
import addressSchema from "@/Schemas/common/addressSchema";
const vendorDetailSchema = new Schema<IVendor & Document>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    type: addressSchema,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const VendorDetail =
  (mongoose.models.VendorDetail as mongoose.Model<IVendor & Document>) ||
  mongoose.model<IVendor & Document>("VendorDetail", vendorDetailSchema);

export default VendorDetail;
