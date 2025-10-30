import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import { SecondPadlockIcon } from "../../assets/svg";
import { useRouter } from "expo-router";
import SubscriptionModal from "./modals/SubscriptionModal";
import * as Device from "expo-device";
import {
  useGetTopicContentMutation,
  useUserActivatedStatusMutation,
} from "../components/services/userService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenCapture from "expo-screen-capture";
import ScreenshotPrevent from "react-native-screenshot-prevent";
import BirthdayImage from "../../assets/images/birthdayImage.png";

interface TopicComponentProps {
  title: string;
  id: number;
  free: boolean;
  courseName: string;
  level: string;
  onPdfOpen?: (pdfData: any) => void;
}

const TopicComponent: React.FC<TopicComponentProps> = ({
  title,
  id,
  free,
  courseName,
  level,
  onPdfOpen,
}) => {
  const [uuid, setUuid] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imageData, setImageData] = useState<string[]>([]);
  useEffect(() => {
    const fetchStoredUuid = async () => {
      try {
        let storedUuid = await AsyncStorage.getItem("device_uuid");

        if (storedUuid) {
          console.log("Stored UUID:", storedUuid);
          setUuid(storedUuid);
        }
      } catch (error) {
        console.error("Error fetching UUID:", error);
      }
    };

    fetchStoredUuid();
  }, []);
  const phoneImei = uuid;
  const router = useRouter();
  const [modal, setModal] = React.useState(false);

  const [getTopicContent, { data, error, isLoading }] =
    useGetTopicContentMutation();
  const [userActivatedStatus] = useUserActivatedStatusMutation();
  const isFocused = useIsFocused();

  const activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
  };

  const deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
  };

  if (isFocused) {
    activate();
  }
  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
  }, []);
  interface ActivationMessage {
    semester: string;
    level: number;
    user_id: number;
    id: number;
    is_activated: boolean;
  }

  const [filteredMessage, setFilteredMessage] =
    React.useState<ActivationMessage | null>(null);

  const handlePress = async () => {
    setShowImage(!showImage);

    if (!free) {
      try {
        const netInfo = await NetInfo.fetch();

        if (netInfo.isConnected) {
          const activationStatus = await userActivatedStatus({
            phone_imei: phoneImei,
          }).unwrap();
          console.log(
            "Activation status:",
            activationStatus.message.map((msg) => msg.level)
          );

          await AsyncStorage.setItem(
            "activationMessage",
            JSON.stringify(activationStatus.message)
          );

          const filteredMessage = activationStatus.message.find(
            (msg) => msg.level == parseInt(level)
          );
          console.log("Filtered message:", filteredMessage, parseInt(level));

          if (!filteredMessage || !filteredMessage.is_activated) {
            setFilteredMessage(null);
            // Toast.show({
            //   type: "error",
            //   text1: "Error",
            //   text2: "You do not have access to this content.",
            // });
            setModal(true);
            return;
          } else {
            setFilteredMessage(filteredMessage);
          }
        } else {
          const storedMessage = await AsyncStorage.getItem("activationMessage");
          if (storedMessage) {
            const parsedMessage = JSON.parse(storedMessage);
            const filteredMessage = parsedMessage.find(
              (msg: any) => msg.level === parseInt(level)
            );
            if (!filteredMessage || !filteredMessage.is_activated) {
              // Toast.show({
              //   type: "error",
              //   text1: "Error",
              //   text2: "You do not have access to this content.",
              // });
              setModal(true);
              return;
            }
          } else {
            throw new Error("Activation status not found in storage.");
          }
        }
      } catch (error) {
        console.error("Error fetching activation status:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to verify activation status.",
        });
        return;
      }
    }

    try {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        const result = await getTopicContent({
          phone_imei: uuid,
          topic_id: id,
        }).unwrap();


        console.log("Fetched topic content:", result.topic_images);

        if (result?.topic_images) {
          setImageData(result.topic_images);
        } else {
          setImageData([]);
        }
      } else {
        const storedContents = await AsyncStorage.getItem("userContents");
        if (storedContents) {
          const parsedContents = JSON.parse(storedContents);

          const selectedCourse = parsedContents.find(
            (content: any) => content.course_name === courseName
          );

          if (selectedCourse) {
            const selectedTopic = selectedCourse.topics.find(
              (topic: any) => topic.topic_title === title
            );

            if (selectedTopic) {
              if (selectedTopic.topic_content) {
                onPdfOpen?.({
                  video: selectedTopic.topic_video,
                  pdfUrl: {
                    uri: `https://sbsapp.com.ng/static/${selectedTopic.topic_content}`,
                    cache: true,
                  },
                });
                return;
              }
              router.push({
                pathname: "/other/note",
                params: {
                  content: JSON.stringify({
                    title: selectedTopic.topic_title,
                    free: selectedTopic.topic_free,
                    content: selectedTopic.topic_content,
                    image_1: null,
                    image_2: null,
                    image_3: null,
                    image_4: null,
                    image_5: null,
                    id: null,
                    course_id: null,
                    latex: selectedTopic.topic_latex,
                  }),
                },
              });
            } else {
              throw new Error("Offline topic content not found.");
            }
          } else {
            throw new Error("Offline data not available for selected course.");
          }
        } else {
          throw new Error("No offline data available.");
        }
      }
    } catch (error) {
      console.error("Error fetching topic content:", error);
      const errorMessage =
        (error as any)?.message || "Failed to fetch topic content.";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          {
            backgroundColor: "#F8F8F8",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginBottom: 10,
          },
        ]}
      >
        <View style={styles.Container}>
          <View>
            <Text style={styles.firstText}>{title}</Text>
          </View>
          {!free ? (
            filteredMessage ? (
              <EvilIcons name="unlock" size={15} />
            ) : (
              <SecondPadlockIcon />
            )
          ) : null}
        </View>
      </TouchableOpacity>
      {showImage && (
        <View>
          {imageData.length > 0 ? (
            imageData.map((imageUrl: string, index: number) => (
              <Image
                key={index}
                source={{ uri: `https://sbsapp.com.ng/${imageUrl}` }}
                style={styles.image}
              />
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#666' }}>No content available</Text>
            </View>
          )}
        </View>
      )}
      {modal && <SubscriptionModal setModal={setModal} modal={modal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  RoundedContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  firstText: {
    fontSize: 16,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#000000",
    marginBottom: 5,
  },
  secondText: {
    fontSize: 10,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});

export default TopicComponent;