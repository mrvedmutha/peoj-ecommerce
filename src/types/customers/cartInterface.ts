import { IOrderItem } from "@/types/customers/orders/orderItemInterface";
import { ICxUser } from "@/types/customers/cxUserInterface";
import { CurrencyEnum } from "../enum/country/countryCurrencyEnum";

export interface ICart {
  id?: string;
  products: IOrderItem[];
  totalValue: number;
  currency: CurrencyEnum;
  customer?: ICxUser;
  isLoggedIn?: boolean;
  orderNote: string;
  createdAt: Date;
  updatedAt: Date;
}
