import { ICart } from "@/types/customers/cartInterface";
import { IPaymentDetails } from "@/types/customers/orders/paymentDetails";
import { CheckoutStatus } from "@/types/enum/enumExports";
export interface ICheckout {
  id?: string;
  cart: ICart;
  totalAmount: number;
  currency?: string;
  paymentDetails?: IPaymentDetails;
  status: CheckoutStatus;
  createdAt: Date;
  updatedAt: Date;
}
