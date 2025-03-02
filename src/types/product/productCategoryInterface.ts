import mongoose from "mongoose";
export interface IProductCategory {
  _id?: string;
  category: string;
  categoryDesc: string;
  parent?: mongoose.Types.ObjectId | null;
  createAt?: Date;
}
