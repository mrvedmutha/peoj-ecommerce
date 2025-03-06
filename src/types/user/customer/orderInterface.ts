import { ICxUser } from "@/types/user/customer/cxUserInterface";
import { IProduct } from "@/types/product/productInterface";
import {
  PaymentMethod,
  ShippingStatus,
  PaymentStatus,
} from "@/types/enum/enumExports";

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id?: string;
  orderNumber: string;
  orderDate: Date;
  orderStatus: ShippingStatus;
  items: IOrderItem[];
  orderTotal: number;
  orderItemCurr: string;
  customer: ICxUser;
  orderPaymentMethod: PaymentMethod;
  orderPaymentStatus: PaymentStatus;
}
