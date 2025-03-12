import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "@/types/enum/enumExports";
import { ICxUser } from "@/types/customers/cxUserInterface";
import addressSchema from "@/Schemas/common/addressSchema";

const cxUserSchema = new Schema<ICxUser & Document>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: {
    type: [addressSchema],
    default: null,
  },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  isVerified: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  tags: [
    {
      type: String,
    },
  ],
  notes: [
    {
      type: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CxUser =
  (mongoose.models.CxUser as mongoose.Model<ICxUser & Document>) ||
  mongoose.model<ICxUser & Document>("CxUser", cxUserSchema);

export default CxUser;
