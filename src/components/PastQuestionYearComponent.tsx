import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import ImageCacheService from "../services/ImageCacheService";
import NetInfo from "@react-native-community/netinfo";

interface PastQuestionYearComponentProps {
  question: {
    id: number;
    year: number;
    topic_id: number;
    images: string[];
    latex: boolean;
  };
  free: boolean;
  level: string;
}

const PastQuestionYearComponent: React.FC<PastQuestionYearComponentProps> = ({
  question,
  free,
  level,
}) => {
  const router = useRouter();
  const [showImages, setShowImages] = useState(false);
  const [showImageText, setShowImageText] = useState(false);

  const handlePress = async () => {
    setShowImages(!showImages);

    if (question.images.length === 0) {
      setShowImageText(true);
      return;
    }

    // Images already have local paths if coming from cached PQ data offline
    // Or remote paths if online — imageViewer handles both
    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      // Cache images in background for offline
      ImageCacheService.cacheImages(question.images).catch((err) =>
        console.error("PQYear cache error:", err)
      );
    }

    router.push({
      pathname: "/other/imageViewer",
      params: {
        images: JSON.stringify(question.images),
        title: `Past Questions ${question.year}`,
      },
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 20,
          marginBottom: 10,
        }}
      >
        <View style={styles.Container}>
          <View>
            <Text style={styles.firstText}>{question.year}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {showImages && showImageText && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "#666" }}>
            No past question available
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstText: {
    fontSize: 16,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#000000",
    marginBottom: 5,
  },
});

export default PastQuestionYearComponent;