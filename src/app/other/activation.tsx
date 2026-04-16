import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Activation = () => {
  const [method, setMethod] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState("");
  const theMethods = [
    { label: "Pin", value: "Pin" },
  ];

  useEffect(() => {
    const fetchStoredUuid = async () => {
      try {
        let storedUuid = await AsyncStorage.getItem("device_uuid");
        if (storedUuid) {

          setUuid(storedUuid);
        }
      } catch (error) {
        console.error("Error fetching UUID:", error);
      }
    };

    fetchStoredUuid();
  }, []);



  const handleProceed = async () => {

    if (method === "Pin") {
      router.push("/other/activateSubscription");
      setMethod("");

    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select a method",
      });
    }
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>Activation Method</Text>
        <Text style={styles.secondText}>Activate your account</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Activation Method</Text>
          <DropDownPicker
            open={open}
            value={method}
            items={theMethods}
            setOpen={setOpen}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40,
            }}
            setValue={setMethod}
            placeholder="Select method"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />

        </View>

        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
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
    fontSize: 10,
    color: "#1A1A1A",
    fontWeight: "400",
    marginBottom: 5,
  },
  fourthText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 5,
  },
  pickerContainer: {
    marginTop: 30,
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

export default Activation;