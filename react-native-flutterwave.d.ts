// react-native-flutterwave.d.ts
declare module 'react-native-flutterwave' {
  export interface PaymentData {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    customer: {
      email: string;
      name: string;
      phone_number?: string;
    };
    customizations?: {
      title?: string;
      description?: string;
      logo?: string;
    };
    redirect_url?: string;
  }

  export interface PaymentResponse {
    status: 'successful' | 'cancelled' | 'failed';
    transaction_id?: string;
    tx_ref?: string;
    flw_ref?: string;
  }

  export interface FlutterwaveButtonProps extends PaymentData {
    onRedirect: (data: PaymentResponse) => void;
    onAbort?: () => void;
    onError?: (error: any) => void;
  }

  export function FlutterwaveButton(props: FlutterwaveButtonProps): void;
}