import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
  year: number;
  topic_id: number;
  latex: boolean;
  pdf_content: string;
  id: number;
}

const PastQuestionYearComponent: React.FC<PastQuestionYearComponentProps> = ({
  year,
  topic_id,
  latex,
  pdf_content,
  id,
}) => {
  const router = useRouter();
  const [secondModal, setSecondModal] = React.useState(false);

  const handlePress = async () => {
    try {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        if (pdf_content) {
          setSecondModal(true);
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching pastquestion content:", error);
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
        <Text style={styles.firstText}>{year}</Text>
      </View>

      {secondModal && pdf_content && (
        <PdfComponent
          setModal={setSecondModal}
          modal={secondModal}
          video=""
          pdfUrl={{
            uri: `https://sbsapp.com.ng/static/${pdf_content}`,
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

export default PastQuestionYearComponent;
