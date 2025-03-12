import { CurrencyEnum } from "@/types/enum/country/countryCurrencyEnum";
import { PaymentMethod, PaymentStatus } from "@/types/enum/enumExports";

export interface IPaymentDetails {
  method: PaymentMethod;
  transactionID: string;
  amount: number;
  currency: CurrencyEnum;
  status: PaymentStatus;
  createdAt: Date;
  isTest: boolean;
}
