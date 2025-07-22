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
import { PayWithFlutterwaveV2 } from "flutterwave-react-native";
import { FlutterwaveInitV2Options, Currency } from "../../../flutterwave-types";
import DropDownPicker from "react-native-dropdown-picker";

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

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [paymentMethodItems, setPaymentMethodItems] = useState([
    { label: "Card Payment", value: "card" },
    { label: "Bank Transfer", value: "account" },
    { label: "USSD", value: "ussd" },
  ]);

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
    if (!email || !userId || !level || !paymentMethod) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill out all required fields.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    const tx_ref = `txn_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

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
      payment_method: paymentMethod,
      payment_options: paymentMethod,
    };

    console.log("Payment options configured:", flutterwaveOptions);

    setPaymentOptions(flutterwaveOptions);
    setShowPayment(true);

    console.log("Payment component should now be visible");
  };

  const handleOnRedirect = (data: any) => {
    console.log("Payment redirect data:", data);

    if (data.status === "successful") {
      Toast.show({
        type: "success",
        text1: "Payment Successful",
        text2: "Your premium access has been activated!",
      });

      router.push("/other/paymentSuccess");
    } else if (data.status === "cancelled") {
      Toast.show({
        type: "info",
        text1: "Payment Cancelled",
        text2: "Payment was cancelled by user",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: "Payment could not be completed. Please try again.",
      });
    }

    setShowPayment(false);
    setPaymentOptions(null);
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>Make payment</Text>
        <Text style={styles.secondText}>
          Secure your access to premium features. Complete your payment below.
        </Text>

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
                  zIndex: 5000,
                }}
                textStyle={{
                  color: "#000000",
                  fontSize: 14,
                }}
                placeholderStyle={{
                  color: "#98A2B3",
                  fontSize: 14,
                }}
                zIndex={5000}
                zIndexInverse={1000}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.thirdText}>Payment Method</Text>
              <DropDownPicker
                open={paymentMethodOpen}
                value={paymentMethod}
                items={paymentMethodItems}
                setOpen={setPaymentMethodOpen}
                setValue={setPaymentMethod}
                setItems={setPaymentMethodItems}
                placeholder="Select payment method"
                style={[styles.secondInnerContainer, { height: 50 }]}
                dropDownContainerStyle={{
                  borderColor: "#D0D5DD",
                  backgroundColor: "#FFFFFF",
                  zIndex: 3000,
                }}
                textStyle={{
                  color: "#000000",
                  fontSize: 14,
                }}
                placeholderStyle={{
                  color: "#98A2B3",
                  fontSize: 14,
                }}
                zIndex={3000}
                zIndexInverse={3000}
              />
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
      </View>
    </SafeAreaView>
  );
};

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
