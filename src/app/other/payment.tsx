import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useGetUserIdMutation } from "../../components/services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayWithFlutterwaveV2 } from "flutterwave-react-native";
import { FlutterwaveInitV2Options, Currency } from "../../../flutterwave-types";
import DropDownPicker from "react-native-dropdown-picker";

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

// Payment methods configuration
const PAYMENT_METHODS = [
  { id: "card", label: "Credit/Debit Card", icon: "💳" },
  { id: "account", label: "Bank Account", icon: "🏦" },
  { id: "banktransfer", label: "Bank Transfer", icon: "💸" },
  { id: "mpesa", label: "M-Pesa", icon: "📱" },
  { id: "mobilemoney", label: "Mobile Money", icon: "💰" },
  { id: "ussd", label: "USSD", icon: "#️⃣" },
  { id: "qr", label: "QR Code", icon: "📷" },
];

const payment = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [getUserId, { isLoading: isUserIdLoading }] = useGetUserIdMutation();
  const router = useRouter();
  const [phoneImei, setPhoneImei] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<Omit<
    FlutterwaveInitV2Options,
    "redirect_url"
  > | null>(null);
  const [level, setLevel] = useState(null);
  const [levelOpen, setLevelOpen] = useState(false);
  const [levelItems, setLevelItems] = useState([
    { label: "100Level", value: "100" },
    { label: "200Level", value: "200" },
    { label: "300Level", value: "300" },
    { label: "400Level", value: "400" },
    { label: "500Level", value: "500" },
  ]);

  // New state for payment method selection
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >(["card", "account"]);

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

  // Function to toggle payment method selection
  const togglePaymentMethod = (methodId: string) => {
    setSelectedPaymentMethods((prev) => {
      if (prev.includes(methodId)) {
        // Remove if already selected (but keep at least one method)
        if (prev.length > 1) {
          return prev.filter((id) => id !== methodId);
        } else {
          Toast.show({
            type: "info",
            text1: "Notice",
            text2: "At least one payment method must be selected.",
          });
          return prev;
        }
      } else {
        // Add if not selected
        return [...prev, methodId];
      }
    });
  };

  const handleProceed = () => {
    if (!email || !userId || !level) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill out email and ensure user ID is valid.",
      });
      return;
    }

    if (selectedPaymentMethods.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select at least one payment method.",
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

    // Build payment methods string from selected methods
    const paymentMethodsString = selectedPaymentMethods.join(",");

    // Flutterwave V2 payment configuration with selected payment methods
    const flutterwaveOptions: Omit<FlutterwaveInitV2Options, "redirect_url"> = {
      PBFPubKey: "FLWPUBK-5a5a622b1098918c3db6fa5ecbc7fdba-X",
      txref: tx_ref,
      amount: 3000,
      currency: "NGN" as Currency,
      customer_email: email,
      customer_firstname: "Premium",
      customer_lastname: level,
      customer_phone: userId.toString(),
      custom_title: "Premium Access Payment",
      custom_description: "Payment for premium features",
      custom_logo: "",
      payment_method: paymentMethodsString, // Dynamic payment methods
    };

    console.log("Payment options configured:", flutterwaveOptions);
    console.log("Selected payment methods:", paymentMethodsString);

    // Set payment options and show payment component
    setPaymentOptions(flutterwaveOptions);
    setShowPayment(true);

    console.log("Payment component should now be visible");
  };

  const handleOnRedirect = (data: any) => {
    console.log("Payment redirect data:", data);

    // Handle payment success/failure
    if (data.status === "successful") {
      Toast.show({
        type: "success",
        text1: "Payment Successful",
        text2: "Your premium access has been activated!",
      });

      // Navigate to success screen or update user status
      router.push("/other/paymentSuccess");
    } else if (data.status === "cancelled") {
      Toast.show({
        type: "info",
        text1: "Payment Cancelled",
        text2: "Payment was cancelled by user",
      });

      // Explicitly reset payment state for cancellation
      setShowPayment(false);
      setPaymentOptions(null);
      return; // Early return to avoid duplicate reset
    } else {
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: "Payment could not be completed. Please try again.",
      });
    }

    // Reset payment state for other cases
    setShowPayment(false);
    setPaymentOptions(null);
  };
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>Make payment</Text>
        <Text style={styles.secondText}>
          Secure your access to premium features. Complete your payment below.
        </Text>

        {/* Fixed PayWithFlutterwaveV2 implementation */}
        {showPayment && paymentOptions ? (
          <View style={{ flex: 1, marginTop: 20 }}>
            <PayWithFlutterwaveV2
              onRedirect={handleOnRedirect}
              options={paymentOptions}
            />
          </View>
        ) : (
          <>
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
                placeholder="Enter email address"
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.thirdText}>Level</Text>
              <DropDownPicker
                open={levelOpen}
                value={level}
                items={levelItems}
                setOpen={setLevelOpen}
                setValue={setLevel}
                setItems={setLevelItems}
                placeholder="Select your level"
                style={[styles.secondInnerContainer, { height: 50 }]}
                dropDownContainerStyle={{
                  borderColor: "#D0D5DD",
                  backgroundColor: "#FFFFFF",
                }}
                textStyle={{
                  color: "#000000",
                  fontSize: 14,
                }}
                placeholderStyle={{
                  color: "#98A2B3",
                  fontSize: 14,
                }}
                zIndex={1000}
                zIndexInverse={3000}
              />
            </View>

            {/* Payment Methods Selection */}
            <View style={styles.pickerContainer}>
              <Text style={styles.thirdText}>Payment Methods</Text>
              <Text style={styles.helperText}>
                Select your preferred payment options (
                {selectedPaymentMethods.length} selected)
              </Text>

              <View style={styles.paymentMethodsContainer}>
                {PAYMENT_METHODS.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentMethodItem,
                      selectedPaymentMethods.includes(method.id) &&
                        styles.selectedPaymentMethod,
                    ]}
                    onPress={() => togglePaymentMethod(method.id)}
                  >
                    <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                    <Text
                      style={[
                        styles.paymentMethodText,
                        selectedPaymentMethods.includes(method.id) &&
                          styles.selectedPaymentMethodText,
                      ]}
                    >
                      {method.label}
                    </Text>
                    {selectedPaymentMethods.includes(method.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, isUserIdLoading && { opacity: 0.6 }]}
              onPress={handleProceed}
              disabled={isUserIdLoading}
            >
              <Text style={styles.buttonText}>
                {isUserIdLoading ? "Loading..." : "Pay with Flutterwave"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Updated styles with new payment method selection styles
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
  helperText: {
    fontSize: 12,
    color: "#667085",
    marginBottom: 10,
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
    marginBottom: 30,
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
  // New styles for payment method selection
  paymentMethodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  paymentMethodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    minWidth: "45%",
    marginBottom: 8,
  },
  selectedPaymentMethod: {
    borderColor: "#FF8C00",
    backgroundColor: "#FFF4E6",
  },
  paymentMethodIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  paymentMethodText: {
    fontSize: 13,
    color: "#344054",
    flex: 1,
  },
  selectedPaymentMethodText: {
    color: "#FF8C00",
    fontWeight: "500",
  },
  checkmark: {
    color: "#FF8C00",
    fontSize: 14,
    fontWeight: "bold",
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
  dropDownContainer: {
    borderColor: "#B0BEC5",
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
