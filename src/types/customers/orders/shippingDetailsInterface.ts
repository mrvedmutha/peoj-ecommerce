import { ShippingStatus } from "@/types/enum/enumExports";
export interface IShippingDetails {
  awb: string;
  trackingURL: string;
  status: ShippingStatus;
}
