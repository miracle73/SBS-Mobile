import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import TopicComponent from "../../components/TopicComponent";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PastQuestionYearComponent from "../../components/PastQuestionYearComponent";

const PastQuestionYear = () => {
  const { content } = useLocalSearchParams();
  const searchResults = typeof content === "string" ? JSON.parse(content) : [];

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {searchResults.length == 0 ? (
          <Text style={styles.firstText}> No PastQuestion </Text>
        ) : (
          <Text style={styles.firstText}>
            {" "}
            View the different {searchResults.length == 1
              ? "year"
              : "years"}{" "}
            for this past question
          </Text>
        )}
        {searchResults.map((question: any, index: any) => (
          <PastQuestionYearComponent
            key={index}
            question={question}
            free={true}
            level=""
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  firstText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
    marginBottom: 5,
  },
  secondText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 150,
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
  },
});

export default PastQuestionYear;