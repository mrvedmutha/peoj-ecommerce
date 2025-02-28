import { Roles } from "./enum/enumExports";
export interface IUser {
  _id?: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: Roles;
  createdBy: any;
  createdAt: Date;
}
