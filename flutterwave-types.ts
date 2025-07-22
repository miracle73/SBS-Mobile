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

export interface FlutterwaveInitV2Options {
  PBFPubKey: string;
  txref: string;
  amount: number;
  currency: Currency;
  customer_email: string;

  customer_firstname?: string;
  customer_lastname?: string;
  customer_phone?: string;

  custom_title?: string;
  custom_description?: string;
  custom_logo?: string;

  payment_method?: string;
  payment_options?: string;

  redirect_url?: string;

  country?: string;
  payment_plan?: string;
  subaccounts?: Array<{
    id: string;
    transaction_split_ratio?: number;
    transaction_charge_type?: string;
    transaction_charge?: number;
  }>;

  meta?: Array<{
    metaname: string;
    metavalue: string;
  }>;

  integrity_hash?: string;

  callback?: (response: any) => void;

  hosted_payment?: boolean;
}

export interface FlutterwaveV2Response {
  status: "successful" | "cancelled" | "failed";
  transaction_id?: string;
  tx_ref?: string;
  flw_ref?: string;
  amount?: number;
  currency?: string;
  charged_amount?: number;
  app_fee?: number;
  merchant_fee?: number;
  processor_response?: string;
  auth_model?: string;
  ip?: string;
  narration?: string;
  customer?: {
    id: number;
    email: string;
    phone_number: string;
    name: string;
    created_at: string;
  };
  card?: {
    first_6digits: string;
    last_4digits: string;
    issuer: string;
    country: string;
    type: string;
    token: string;
    expiry: string;
  };
}

export interface RedirectParamsV2 {
  status: "successful" | "cancelled" | "failed";
  tx_ref: string;
  transaction_id?: string;
  flw_ref?: string;
}
