import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  useGetTopicContentMutation,
  useUserActivatedStatusMutation,
} from "../components/services/userService";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
import PdfComponent from "./PdfComponent";

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

  const handlePress = async () => {
    setShowImages(!showImages);
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
            <Text style={styles.firstText}>{question.year}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {showImages && (
        <View>
          {question.images.length > 0 ? (
            question.images.map((imageUrl: string, index: number) => (
              <Image
                key={index}
                source={{ uri: `https://sbsapp.com.ng/${imageUrl}` }}
                style={styles.image}
              />
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#666' }}>No pastquestion available</Text>
            </View>
          )}
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

export default PastQuestionYearComponent;