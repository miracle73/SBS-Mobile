// types/flutterwave-types.ts

export type Currency =
  | "NGN"
  | "USD"
  | "GHS"
  | "KES"
  | "ZAR"
  | "UGX"
  | "RWF"
  | "ZMW"
  | string;

export interface FlutterwaveInitOptions {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency?: Currency;
  redirect_url?: string;
  customer: {
    email: string;
    name?: string;
    phone_number?: string;
  };
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  authorization: string;
  [key: string]: any; // For additional properties
}
