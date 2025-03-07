import { ICxUser } from "../user/customer/cxUserInterface";

export interface IProductRating {
  _id?: string;
  rating: number;
  comment: string;
  product: string;
  user: ICxUser;
  createdAt: Date;
  updatedAt: Date;
  isVerifedPurchase: boolean;
}
