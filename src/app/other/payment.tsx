import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useGetUserIdMutation } from "../../components/services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { FlutterwaveInitOptions, Currency } from "../../../flutterwave-types";

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
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [getUserId, { isLoading: isUserIdLoading }] = useGetUserIdMutation();
  const router = useRouter();
  const [phoneImei, setPhoneImei] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<Omit<
    FlutterwaveInitOptions,
    "redirect_url"
  > | null>(null);

  useEffect(() => {
    const fetchPhoneImeiAndUserId = async () => {
      try {
        const storedPhoneImei = await AsyncStorage.getItem("device_uuid");
        console.log(storedPhoneImei);
        if (storedPhoneImei) {
          setPhoneImei(storedPhoneImei);
          const result = await getUserId({
            phone_imei: storedPhoneImei,
          }).unwrap();
          console.log(result, 600);
          if (result.status === "Info" && result.message.id) {
            setUserId(result.message.id);
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to fetch user ID. Please try again.",
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Device identifier not found. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred while fetching user ID.",
        });
      }
    };

    fetchPhoneImeiAndUserId();
  }, [getUserId]);

  const handleProceed = () => {
    if (!email || !userId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill out email and ensure user ID is loaded.",
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

    // Generate unique transaction reference
    const tx_ref = `txn_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // Flutterwave payment configuration
    const flutterwaveOptions: Omit<FlutterwaveInitOptions, "redirect_url"> = {
      public_key: "FLWPUBK-5a5a622b1098918c3db6fa5ecbc7fdba-X",
      tx_ref: tx_ref,
      amount: 3000,
      currency: "NGN" as Currency,
      customer: {
        email: email,
        name: "200",
        phone_number: userId.toString(),
      },
      customizations: {
        title: "Premium Access Payment",
        description: "Payment for premium features",
        logo: "",
      },
      authorization: "redirect",
    };
    console.log(12);
    // Set payment options and show payment component
    setPaymentOptions(flutterwaveOptions);
    setShowPayment(true);
    console.log(14);
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
          <View style={styles.secondInnerContainer}>
            <Text style={styles.amountText}>₦3,000</Text>
          </View>
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

        {showPayment && paymentOptions && (
          <PayWithFlutterwave
            onRedirect={(data: FlutterwaveResponse) => {
              console.log("Payment response:", data);
              setShowPayment(false);

              if (data.status === "successful") {
                Toast.show({
                  type: "success",
                  text1: "Success",
                  text2: "Payment completed successfully!",
                });
                // Handle successful payment (e.g., navigate to success page)
                router.push("/success"); // or wherever you want to redirect
              } else if (data.status === "cancelled") {
                Toast.show({
                  type: "info",
                  text1: "Cancelled",
                  text2: "Payment was cancelled.",
                });
              } else {
                Toast.show({
                  type: "error",
                  text1: "Failed",
                  text2: "Payment failed. Please try again.",
                });
              }
            }}
            onAbort={() => {
              console.log("Payment aborted");
              setShowPayment(false);
              Toast.show({
                type: "info",
                text1: "Aborted",
                text2: "Payment was aborted.",
              });
            }}
            options={paymentOptions}
          />
        )}
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
    justifyContent: "center",
  },
  amountText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
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
