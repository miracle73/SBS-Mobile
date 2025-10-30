import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import TopicComponent from "../../components/TopicComponent";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import ScreenshotPrevent from "react-native-screenshot-prevent";
import PdfComponent from "../../components/PdfComponent";

const Topics = () => {
  const { topics, level } = useLocalSearchParams();
  const searchResults = typeof topics === "string" ? JSON.parse(topics) : [];
  let levelString = typeof level === "string" ? JSON.parse(level) : "";
  const [pdfData, setPdfData] = React.useState<any>(null);

  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
  }, []);

  const topicResults = searchResults.map((topic: any) => ({
    id: topic.id,
    title: topic.title,
    free: topic.free,
    courseName: topic.courseName,
  }));

  console.log(topicResults, "really");

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {topicResults.length == 0 ? (
          <Text style={styles.firstText}> No Topic</Text>
        ) : (
          <Text style={styles.firstText}>
            {" "}
            View all the{" "}
            {topicResults.length == 1
              ? "study material"
              : "study materials"}{" "}
            here
          </Text>
        )}
        {topicResults.map((result: any, index: any) => (
          <TopicComponent
            key={index}
            id={result.id}
            title={result.title}
            free={result.free}
            courseName={result.courseName}
            level={levelString}
            onPdfOpen={setPdfData}
          />
        ))}
      </ScrollView>
      {pdfData && (
        <PdfComponent
          video={pdfData.video}
          pdfUrl={pdfData.pdfUrl}
        />
      )}
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

export default Topics;