import mongoose, { Schema, Document } from "mongoose";
import { IStoreSetting } from "@/types/store/storeSetting";
import addressSchema from "@/Schemas/common/addressSchema";

const storeSettingSchema = new Schema<IStoreSetting & Document>({
  storeName: { type: String, required: true },
  storeDesc: { type: String, required: true },
  storeLogo: { type: String, required: true },
  address: {
    type: addressSchema,
    required: true,
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const StoreSetting =
  (mongoose.models.StoreSetting as mongoose.Model<IStoreSetting & Document>) ||
  mongoose.model<IStoreSetting & Document>("StoreSetting", storeSettingSchema);

export default StoreSetting;
