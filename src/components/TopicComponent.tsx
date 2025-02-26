import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
import PdfComponent from "./PdfComponent";

interface TopicComponentProps {
  title: string;
  id: number;
  free: boolean;
  courseName: string;
  level: string;
}

const TopicComponent: React.FC<TopicComponentProps> = ({
  title,
  id,
  free,
  courseName,
  level,
}) => {
  const phoneImei = Device.osBuildId || "";
  const router = useRouter();
  const [secondModal, setSecondModal] = React.useState(false);
  const [thirdModal, setThirdModal] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [getTopicContent, { data, error, isLoading }] =
    useGetTopicContentMutation();
  const [selectedTopic, setSelectedTopic] = React.useState<any>(null);
  const [userActivatedStatus] = useUserActivatedStatusMutation();
  console.log(title, id, free, "really");
  const handlePress = async () => {
    if (!free) {
      try {
        const netInfo = await NetInfo.fetch();

        if (netInfo.isConnected) {
          const activationStatus = await userActivatedStatus({
            phone_imei: phoneImei,
          }).unwrap();
          console.log("Activation status:", activationStatus);

          await AsyncStorage.setItem(
            "activationMessage",
            JSON.stringify(activationStatus.message)
          );

          const filteredMessage = activationStatus.message.find(
            (msg) => msg.level === parseInt(level)
          );
          console.log("Filtered message:", filteredMessage);

          if (!filteredMessage || !filteredMessage.is_activated) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "You do not have access to this content.",
            });
            setModal(true);
            return;
          }
        } else {
          const storedMessage = await AsyncStorage.getItem("activationMessage");
          if (storedMessage) {
            const parsedMessage = JSON.parse(storedMessage);
            const filteredMessage = parsedMessage.find(
              (msg: any) => msg.level === parseInt(level)
            );
            if (!filteredMessage || !filteredMessage.is_activated) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "You do not have access to this content.",
              });
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
          phone_imei: Device.osBuildId,
          topic_id: id,
        }).unwrap();
        console.log(result, 1000);
        // If successful, navigate to the note page with topic content
        const topicContent = result.topic_content;
        if (topicContent?.pdf_content) {
          setSecondModal(true);
          return;
        } else {
          // If successful, navigate to the note page with topic content
          console.log(result.topic_content);
          router.push({
            pathname: "/other/note",
            params: { content: JSON.stringify(result.topic_content) },
          });
        }
      } else {
        // Offline mode: fetch data from the AsyncStorage
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
            console.log(selectedTopic, 6000);
            if (selectedTopic) {
              if (selectedTopic.topic_content) {
                setSelectedTopic(selectedTopic);
                setThirdModal(true);
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
              console.log("I did it");
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
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.Container,
        {
          backgroundColor: "#F8F8F8",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 20,
          marginBottom: 10,
        },
      ]}
    >
      <View>
        <Text style={styles.firstText}>{title}</Text>
        {/* <Text style={styles.secondText}>Topic {topics}</Text> */}
      </View>
      {!free && <SecondPadlockIcon />}
      {modal && <SubscriptionModal setModal={setModal} modal={modal} />}
      {secondModal && data?.topic_content && (
        <PdfComponent
          setModal={setSecondModal}
          modal={secondModal}
          pdfUrl={{
            uri: `https://sbsapp.com.ng/static/${data.topic_content?.pdf_content}`,
            cache: true,
          }}
        />
      )}
      {thirdModal && selectedTopic && (
        <PdfComponent
          setModal={setThirdModal}
          modal={thirdModal}
          pdfUrl={{
            uri: `https://sbsapp.com.ng/static/${selectedTopic.topic_content}`,
            cache: true,
          }}
        />
      )}
    </TouchableOpacity>
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
});

export default TopicComponent;
