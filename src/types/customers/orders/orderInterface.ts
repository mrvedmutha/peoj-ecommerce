import { ICxUser } from "@/types/customers/cxUserInterface";
import { IOrderItem } from "./orderItemInterface";
import { IShippingDetails } from "@/types/customers/orders/shippingDetailsInterface";
import { IPaymentDetails } from "@/types/customers/orders/paymentDetails";
import { ICoupon } from "@/types/admin/marketing/couponInterface";

export interface IOrder {
  _id?: string;
  orderNumber: string;
  orderDate: Date;
  customer: ICxUser;
  items: IOrderItem[];
  itemsCount: number;
  orderTotal: number;
  orderItemCurr: string;
  shippingDetails: IShippingDetails;
  paymentDetails: IPaymentDetails;
  coupon: ICoupon;
}
