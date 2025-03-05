import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "@/types/enum/enumExports";
import { ICxUser } from "@/types/cxUserInterface";

const cxUserSchema = new Schema<ICxUser & Document>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  address: {
    type: [
      {
        addressline1: { type: String, required: true },
        addressline2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
      },
    ],
    default: null,
  },
  role: { type: String, required: true, enum: Object.values(Roles) },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const CxUser =
  (mongoose.models.CxUser as mongoose.Model<ICxUser & Document>) ||
  mongoose.model<ICxUser & Document>("CxUser", cxUserSchema);

export default CxUser;
