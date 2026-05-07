import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SecondPadlockIcon } from "../../assets/svg";
import { useRouter } from "expo-router";
import SubscriptionModal from "./modals/SubscriptionModal";
import { useGetTopicPastQuestionQuery } from "../components/services/userService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import ImageCacheService from "../services/ImageCacheService";

interface PastQuestionTopicComponentProps {
  title: string;
  id: number;
  free: boolean;
  year?: string;
  courseName?: string;
  level: string;
}

const PastQuestionTopicComponent: React.FC<PastQuestionTopicComponentProps> = ({
  title, id, free, year, courseName, level,
}) => {
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [showText, setShowText] = useState(false);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const fetchStoredUuid = async () => {
      try {
        let storedUuid = await AsyncStorage.getItem("device_uuid");
        if (storedUuid) setUuid(storedUuid);
      } catch (error) {
        console.error("Error fetching UUID:", error);
      }
    };
    fetchStoredUuid();
  }, []);

  const { data, error, isLoading } = useGetTopicPastQuestionQuery({
    topic_id: id,
    year: Number(year),
  });

  const handlePress = async () => {
    try {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        if (error) {
          const status = (error as any)?.status || (error as any)?.originalStatus;
          if (status === 401) {
            setModal(true);
            return;
          }
          Toast.show({ type: "error", text1: "Error", text2: "Something went wrong. Please try again." });
          return;
        }

        if (data) {
          if (data.questions && data.questions.length > 0) {
            await AsyncStorage.setItem(`cachedPastQuestions_${title}`, JSON.stringify(data.questions));

            for (const question of data.questions) {
              if (question.images && question.images.length > 0) {
                ImageCacheService.cacheImages(question.images).catch((err) => console.error("PQ cache error:", err));
              }
            }

            router.push({
              pathname: "/other/pastQuestionYear",
              params: { content: JSON.stringify(data.questions) },
            });
          } else {
            setShowText(true);
          }
        }
      } else {
        const cachedPQ = await AsyncStorage.getItem(`cachedPastQuestions_${title}`);

        if (cachedPQ) {
          const questions = JSON.parse(cachedPQ);
          const updatedQuestions = await Promise.all(
            questions.map(async (q: any) => {
              if (q.images && q.images.length > 0) {
                const cachedImages = await ImageCacheService.getCachedImages(q.images);
                return { ...q, images: cachedImages || q.images };
              }
              return q;
            })
          );
          router.push({
            pathname: "/other/pastQuestionYear",
            params: { content: JSON.stringify(updatedQuestions) },
          });
        } else {
          Toast.show({ type: "info", text1: "Not Available Offline", text2: "Open this past question while online first to cache it." });
        }
      }
    } catch (error: any) {
      const status = error?.status || error?.originalStatus;
      if (status === 401) {
        setModal(true);
      } else {
        Toast.show({ type: "error", text1: "Error", text2: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.Container, {
          backgroundColor: "#F8F8F8", borderRadius: 10,
          paddingHorizontal: 10, paddingVertical: 20, marginBottom: 10,
        }]}
      >
        <View><Text style={styles.firstText}>{title}</Text></View>
        {!free && <SecondPadlockIcon />}
      </TouchableOpacity>
      {showText && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "#666" }}>No past question available</Text>
        </View>
      )}
      {modal && <SubscriptionModal setModal={setModal} modal={modal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  firstText: { fontSize: 16, fontWeight: "700", fontStyle: "normal", color: "#000000", marginBottom: 5 },
});

export default PastQuestionTopicComponent;