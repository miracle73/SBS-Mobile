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
  // Required fields
  PBFPubKey: string; // Your Flutterwave public key
  txref: string; // Unique transaction reference
  amount: number; // Payment amount
  currency: Currency; // Payment currency
  customer_email: string; // Customer's email address

  // Optional customer information
  customer_firstname?: string; // Customer's first name
  customer_lastname?: string; // Customer's last name
  customer_phone?: string; // Customer's phone number

  // Customization options
  custom_title?: string; // Custom payment page title
  custom_description?: string; // Custom payment description
  custom_logo?: string; // URL to custom logo

  // Payment methods (comma-separated string)
  payment_method?: string; // e.g., "card,account,banktransfer,mpesa,mobilemoney,ussd"

  // Redirect URL (this is what gets omitted in PayWithFlutterwaveV2)
  redirect_url?: string; // URL to redirect after payment

  // Optional fields for advanced configuration
  country?: string; // Default payment country
  payment_plan?: string; // Payment plan ID for subscriptions
  subaccounts?: Array<{
    // For split payments
    id: string;
    transaction_split_ratio?: number;
    transaction_charge_type?: string;
    transaction_charge?: number;
  }>;

  // Additional metadata
  meta?: Array<{
    // Custom metadata
    metaname: string;
    metavalue: string;
  }>;

  // Optional integrity hash for security
  integrity_hash?: string; // Hash for payment verification

  // Optional callback configuration
  callback?: (response: any) => void; // Callback function

  // Optional hosted payment options
  hosted_payment?: boolean; // Use hosted payment page
}

// Response interface for payment callbacks
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

// Redirect params interface (for onRedirect callback)
export interface RedirectParamsV2 {
  status: "successful" | "cancelled" | "failed";
  tx_ref: string;
  transaction_id?: string;
  flw_ref?: string;
}
