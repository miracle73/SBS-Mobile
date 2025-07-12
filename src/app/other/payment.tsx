import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { FlutterwaveButton } from "react-native-flutterwave";
// import { PayWithFlutterwave } from 'flutterwave-react-native';

// TypeScript interfaces for Flutterwave responses
interface FlutterwaveResponse {
  status: "successful" | "cancelled" | "failed";
  transaction_id?: string;
  tx_ref?: string;
  flw_ref?: string;
  amount?: number;
  currency?: string;
  customer?: {
    email: string;
    name: string;
  };
}

interface FlutterwaveError {
  message?: string;
  code?: string;
  [key: string]: any;
}

const payment = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleProceed = () => {
    if (!amount || !name || !email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill out all fields before proceeding.",
      });
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    // Amount validation
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid amount.",
      });
      return;
    }

    // Generate unique transaction reference
    const tx_ref = `txn_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // Flutterwave payment configuration
    const paymentData = {
      public_key: "FLWPUBK-5a5a622b1098918c3db6fa5ecbc7fdba-X",
      tx_ref: tx_ref,
      amount: numericAmount,
      currency: "NGN", // Change to your preferred currency
      customer: {
        email: email,
        name: name,
      },
      customizations: {
        title: "Premium Access Payment",
        description: "Payment for premium features",
        logo: "", // Add your logo URL here if needed
      },
      redirect_url: "", // Optional: Add redirect URL if needed
    };

    // Handle successful payment
    const handleOnRedirect = (data: FlutterwaveResponse) => {
      console.log("Payment redirect data:", data);

      if (data.status === "successful") {
        Toast.show({
          type: "success",
          text1: "Payment Successful",
          text2: "Your payment has been processed successfully!",
        });

        // Navigate to home or success page
        router.push("/home");
      } else if (data.status === "cancelled") {
        Toast.show({
          type: "info",
          text1: "Payment Cancelled",
          text2: "You cancelled the payment process.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Payment Failed",
          text2: "Payment was not successful. Please try again.",
        });
      }
    };

    // Handle payment errors
    const handlePaymentError = (error: FlutterwaveError) => {
      console.log("Payment error:", error);
      Toast.show({
        type: "error",
        text1: "Payment Error",
        text2: "An error occurred during payment. Please try again.",
      });
    };

    // Initialize Flutterwave payment
    FlutterwaveButton({
      ...paymentData,
      onRedirect: handleOnRedirect,
      onAbort: () => {
        Toast.show({
          type: "info",
          text1: "Payment Cancelled",
          text2: "Payment process was cancelled.",
        });
      },
      onError: handlePaymentError,
    });
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>Make payment</Text>
        <Text style={styles.secondText}>
          Secure your access to premium features. Complete your payment below.
        </Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Amount (NGN)</Text>
          <TextInput
            style={styles.secondInnerContainer}
            placeholderTextColor="#98A2B3"
            placeholder={" Enter amount"}
            onChangeText={(text) => {
              setAmount(text);
            }}
            keyboardType="numeric"
            value={amount}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Your name</Text>
          <TextInput
            style={styles.secondInnerContainer}
            placeholderTextColor="#98A2B3"
            placeholder={" Enter name"}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Email address</Text>
          <TextInput
            style={styles.secondInnerContainer}
            placeholderTextColor="#98A2B3"
            placeholder={" Enter email address"}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Pay with Flutterwave</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  firstText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 5,
  },
  secondText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
  },
  thirdText: {
    fontSize: 14,
    color: "#101928",
    fontWeight: "500",
    marginBottom: 5,
  },
  fourthText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 5,
  },
  pickerContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FF8C00",
    paddingVertical: 15,
    marginTop: 70,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondContainer: {
    height: 60,
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  secondInnerContainer: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderColor: "#D0D5DD",
    flexShrink: 0,
    flexGrow: 0,
    color: "#000000",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    color: "#000000",
    paddingRight: 30,
    alignSelf: "stretch",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    color: "#000000",
    paddingRight: 30,
    alignSelf: "stretch",
  },
  iconContainer: {
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default payment;
