import { Roles } from "./enum/enumExports";
import { IOrder } from "./orderInterface";
export interface ICxUser {
  _id?: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  address: Array<string>;
  role: string;
  createdAt: Date;
  orders: IOrder[];
}
