import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "@/types/enum/enumExports";
import { IUser } from "@/types/user/userInterface";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  isVerified: { type: Boolean, default: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User =
  (mongoose.models.User as mongoose.Model<IUser & Document>) ||
  mongoose.model<IUser & Document>("User", userSchema);

export default User;
