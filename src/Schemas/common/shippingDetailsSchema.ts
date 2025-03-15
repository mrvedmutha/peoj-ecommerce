import { IShippingDetails } from "@/types/customers/orders/shippingDetailsInterface";
import { Schema } from "mongoose";

const shippingDetails = new Schema<IShippingDetails>({
  awb: {
    type: String,
    required: true,
  },
  trackingURL: {
    type: String,
  },
});

export default shippingDetails;
