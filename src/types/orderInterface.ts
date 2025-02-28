import { ICxUser } from "./cxUserInterface";
import { IProduct } from "./product/productInterface";
export interface IOrder {
  _id?: string;
  orderNumber: string;
  orderDate: Date;
  orderStatus: string;
  orderItems: any;
  orderTotal: number;
  customer: ICxUser;
  products: IProduct[];
}
