import { Roles } from "./enum/enumExports";
import { IOrder } from "./orderInterface";
export interface IAddress {
  addressline1: string;
  addressline2?: string; // Optional
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface ICxUser {
  _id?: string;
  username: string;
  fullname: string;
  email: string;
  password?: string;
  phone: string;
  address: IAddress[] | null;
  role: Roles;
  createdAt: Date;
  orders: IOrder[];
  isVerified: boolean;
}
