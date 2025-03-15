import { IAddress } from "../IAddressInterface";
export interface IVendor {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: IAddress;
  createdAt?: Date;
  updatedAt?: Date;
}
