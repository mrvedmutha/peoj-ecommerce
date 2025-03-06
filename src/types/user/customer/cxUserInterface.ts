import { Roles } from "@/types/enum/enumExports";
import { IOrder } from "@/types/user/customer/orderInterface";
import { IAddress } from "@/types/IAddressInterface";

export interface ICxUser {
  _id?: string;
  username: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: IAddress[] | null;
  role: Roles;
  createdAt: Date;
  orders: IOrder[];
  isVerified: boolean;
}
