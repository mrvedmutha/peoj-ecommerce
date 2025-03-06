import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "@/types/enum/enumExports";
import { ICxUser } from "@/types/user/customer/cxUserInterface";
import addressSchema from "@/Schemas/common/addressSchema";

const cxUserSchema = new Schema<ICxUser & Document>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: {
    type: [addressSchema],
    default: null,
  },
  role: { type: String, required: true, enum: Object.values(Roles) },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: null }],
});

const CxUser =
  (mongoose.models.CxUser as mongoose.Model<ICxUser & Document>) ||
  mongoose.model<ICxUser & Document>("CxUser", cxUserSchema);

export default CxUser;
