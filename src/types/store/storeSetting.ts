import { IAddress } from "@/types/IAddressInterface";
import { CountryEnum } from "../enum/country/countryEnum";
export interface IStoreSetting {
  _id?: string;
  storeName: string;
  storeDesc: string;
  storeLogo: string;
  address: IAddress;
  email: string;
  phone: string;
  baseCurrency: CountryEnum;
}
