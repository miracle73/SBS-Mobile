import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SecondPadlockIcon } from "../../assets/svg";
import { useRouter } from "expo-router";
import SubscriptionModal from "./modals/SubscriptionModal";
import * as Device from "expo-device";
import {
  useGetTopicPastQuestionQuery,
  useUserActivatedStatusMutation,
} from "../components/services/userService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

interface PastQuestionTopicComponentProps {
  title: string;
  id: number;
  free: boolean;
  year?: string;
  courseName?: string;
  level: string;
}

const PastQuestionTopicComponent: React.FC<PastQuestionTopicComponentProps> = ({
  title,
  id,
  free,
  year,
  courseName,
  level,
}) => {
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [userActivatedStatus] = useUserActivatedStatusMutation();
  const phoneImei = Device.osBuildId || "";
  const { data, error, isLoading } = useGetTopicPastQuestionQuery({
    topic_id: id,
    year: Number(year),
  });

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
          console.log("Filtered message:", filteredMessage, parseInt(level));

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
        if (error) {
          console.error("Error fetching topic content:", error);
          const errorMessage =
            (error as any).data?.detail?.message ||
            "Failed to fetch topic content.";
          Toast.show({
            type: "error",
            text1: "Error",
            text2: errorMessage,
          });
          return;
        }

        if (data) {
          if (data[0]?.pdf_content) {
            router.push({
              pathname: "/other/pastQuestionYear",
              params: { content: JSON.stringify(data) },
            });
            return;
          }
          // If successful, navigate to the note page with topic content
          router.push({
            pathname: "/other/pastQuestion",
            params: { content: JSON.stringify(data) },
          });
        }
      } else {
        // Offline mode: fetch data from the AsyncStorage
        const storedContents = await AsyncStorage.getItem("userContents");
        if (storedContents) {
          const parsedContents = JSON.parse(storedContents);
          const selectedCourse = parsedContents.find(
            (content: any) => content.course_name == courseName
          );

          if (selectedCourse) {
            const selectedTopic = selectedCourse.topics.find(
              (topic: any) => topic.topic_title === title
            );
            if (selectedTopic && selectedTopic.past_questions) {
              const offlinePastQuestions = selectedTopic.past_questions.map(
                (pq: any) => ({
                  year: pq.year,
                  pdf_content: pq.content,
                  image_1: pq.images[0],
                  image_2: pq.images[1],
                  image_3: pq.images[2],
                  image_4: pq.images[3],
                  image_5: pq.images[4],
                  file: null,
                  topic_id: null,
                  id: null,
                  latex: pq.latex,
                })
              );
              if (offlinePastQuestions[0]?.pdf_content) {
                router.push({
                  pathname: "/other/pastQuestionYear",
                  params: { content: JSON.stringify(offlinePastQuestions) },
                });
                return;
              }
              router.push({
                pathname: "/other/pastQuestion",
                params: { content: JSON.stringify(offlinePastQuestions) },
              });
            } else {
              throw new Error("Offline past questions not found.");
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
      </View>
      {!free && <SecondPadlockIcon />}
      {modal && <SubscriptionModal setModal={setModal} modal={modal} />}
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

export default PastQuestionTopicComponent;
