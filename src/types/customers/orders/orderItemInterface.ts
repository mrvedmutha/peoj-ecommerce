import { IProduct } from "@/types/product/productInterface";
import { CurrencyEnum } from "@/types/enum/country/countryCurrencyEnum";
export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
  currency: CurrencyEnum;
}
