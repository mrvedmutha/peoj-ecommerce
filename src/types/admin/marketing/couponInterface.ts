import { IProduct } from "@/types/product/productInterface";
import { CouponType } from "@/types/enum/enumExports";
import { ICxUser } from "@/types/customers/cxUserInterface";
export interface ICoupon {
  name: string;
  code: string;
  type: CouponType;
  products: IProduct[];
  limit: boolean;
  startDate: Date;
  endDate: Date;
  specificCustomers: ICxUser[];
}
