import { IAddress } from "@/types/IAddressInterface";
export interface IStoreSetting {
  _id?: string;
  storeName: string;
  storeDesc: string;
  storeLogo: string;
  address: IAddress;
  email: string;
  phone: string;
}
