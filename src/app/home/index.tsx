import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  Button,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  NotificationIcon,
  KeyIcon,
  SearchIcon,
  PadlockIcon,
  SnowflakeIcon,
} from "../../../assets/svg";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HomeComponent from "../../components/HomeComponent";
import SubscriptionModal from "../../components/modals/SubscriptionModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserContentsQuery } from "../../components/services/userService";
import { setUserContents } from "../../components/redux/slices/userContentSlice";
import { useAppDispatch } from "../../components/redux/store";
import * as Device from "expo-device";
import Pdf from "react-native-pdf";
import PdfComponent from "../../components/PdfComponent";
import { usePreventScreenCapture } from "expo-screen-capture";

export default function Page() {
  usePreventScreenCapture();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { data: userContents } = useGetUserContentsQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const pdfUrl = {
    uri: "https://sbsapp.com.ng/static/CHAPTER_THREE_SOLUTION_OF_A_DIFFERENTIAL_EQUATION.pdf",
    cache: true,
  };

  console.log("Device ID:", Device.osBuildId);

  useEffect(() => {
    const fetchStoredBirthdays = async () => {
      const storedBirthdays = await AsyncStorage.getItem("birthdays");
      if (storedBirthdays) {
        console.log(JSON.parse(storedBirthdays), 46);
      }
    };
    fetchStoredBirthdays();
  }, []);
  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setModalVisible(true);
  //     }, 3000); // Show modal after 3 seconds

  //     return () => clearTimeout(timer); // Cleanup the timer on component unmount
  // }, []);
  useEffect(() => {
    if (userContents) {
      dispatch(setUserContents(userContents));
      // Store the data in AsyncStorage for offline use
      AsyncStorage.setItem("userContents", JSON.stringify(userContents));
    }
  }, [userContents, dispatch]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 70 }}
    >
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.main}>
          {/* <TouchableOpacity style={styles.roundedContainer} onPress={() => router.push("/other/notification")}>
                        <Ionicons name="notifications-outline" size={20} />
                    </TouchableOpacity> */}
        </View>
        <Text style={styles.title}>Welcome to SBS App</Text>
        <Text style={styles.subtitle}>
          Empowering Students, One student at a Time!
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 10,
          }}
        >
          <View style={{ width: "48%", gap: 10 }}>
            <TouchableOpacity onPress={() => router.push("/other/activation")}>
              <HomeComponent
                Icon={KeyIcon}
                firstText="Activate Subscription"
                secondText="Unlock Premium Features Today!"
                backgroundColor="#E53935"
                disabled={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/home/more")}>
              <HomeComponent
                Icon={SnowflakeIcon}
                firstText="Birthdays"
                secondText="Celebrate with Us!"
                backgroundColor="#E5AD35"
                disabled={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/home/edu")}>
              <HomeComponent
                Icon={PadlockIcon}
                firstText="Past Questions"
                secondText="Questions from previous exams"
                backgroundColor="#B0BEC5"
                disabled={false}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "48%", gap: 10 }}>
            <TouchableOpacity onPress={() => router.push("/home/calculator")}>
              <HomeComponent
                Icon={SearchIcon}
                firstText="CGPA Calculator"
                secondText="Track Your Academic Progress"
                backgroundColor="#FFAD84"
                disabled={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/home/notes")}>
              <HomeComponent
                Icon={PadlockIcon}
                firstText="Lecture Notes"
                secondText="Stay ahead with our lecture note"
                backgroundColor="#B0BEC5"
                disabled={false}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => setModal(true)}>
          <Text>Open PDF</Text>
        </TouchableOpacity> */}
      </View>
      {modal && (
        <PdfComponent modal={modal} setModal={setModal} pdfUrl={pdfUrl} />
      )}
      {/* <SubscriptionModal modal={modalVisible} setModal={setModalVisible} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
  },
  roundedContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDF5FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "##000000",
    marginBottom: 15,
    width: "70%",
  },
});
