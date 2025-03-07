import {
  IndiaStatesEnum,
  IndiaStateNamesEnum,
} from "@/types/enum/country/IN/indiaStateEnum";
import { CountryEnum, CountryNameEnum } from "./enum/country/countryEnum";

export interface IAddress {
  addressline1: string;
  addressline2?: string;
  city: string;
  state: IndiaStatesEnum;
  stateCode: IndiaStateNamesEnum;
  country: CountryEnum;
  countryCode: CountryNameEnum;
  pincode: string;
}
