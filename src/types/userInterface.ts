import { Roles } from "./enum/enumExports";
export interface IUser {
  _id?: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: Roles;
  createdBy: any;
  createdAt: Date;
}
