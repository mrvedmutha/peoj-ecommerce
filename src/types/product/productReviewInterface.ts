import { ICxUser } from "../customers/cxUserInterface";
import { IProduct } from "./productInterface";

export interface IProductReview {
  _id?: string;
  rating: number;
  comment: string;
  product: IProduct;
  user: ICxUser;
  createdAt: Date;
  updatedAt: Date;
  isVerifedPurchase: boolean;
}
