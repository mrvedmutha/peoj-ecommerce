import { Schema } from "mongoose";
import { IAddress } from "@/types/IAddressInterface";
import { IndiaStateNamesEnum } from "@/types/enum/country/IN/indiaStateEnum";
import { IndiaStatesEnum } from "@/types/enum/country/IN/indiaStateEnum";
import { CountryEnum } from "@/types/enum/country/countryEnum";
import { CountryNameEnum } from "@/types/enum/country/countryEnum";

const addressSchema = new Schema<IAddress>({
  addressline1: { type: String, required: true },
  addressline2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true, enum: Object.values(IndiaStatesEnum) },
  stateCode: {
    type: String,
    required: true,
    enum: Object.values(IndiaStateNamesEnum),
  },
  country: { type: String, required: true, enum: Object.values(CountryEnum) },
  countryCode: {
    type: String,
    required: true,
    enum: Object.values(CountryNameEnum),
  },
  pincode: { type: String, required: true },
});

export default addressSchema;
