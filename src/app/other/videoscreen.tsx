import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";



// Extract YouTube video ID from various URL formats
const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtu\.be\/)([^?&#]+)/,
    /(?:youtube\.com\/watch\?v=)([^&#]+)/,
    /(?:youtube\.com\/embed\/)([^?&#]+)/,
    /(?:youtube\.com\/v\/)([^?&#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return url; // fallback: assume it's already a video ID
};

const Videoscreen = () => {
  const { videoUrl, topicTitle, images, title } = useLocalSearchParams();
  const router = useRouter();
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  const videoId = extractVideoId(videoUrl as string);

  const onStateChange = useCallback(
    (state: string) => {
      if (state === "ended") {
        setPlaying(false);
        setVideoEnded(true);
        // Save that user has watched this video
        const saveWatchedStatus = async () => {
          try {
            const stored = await AsyncStorage.getItem("watchedVideos");
            const watchedVideos: string[] = stored ? JSON.parse(stored) : [];
            if (!watchedVideos.includes(topicTitle as string)) {
              watchedVideos.push(topicTitle as string);
              await AsyncStorage.setItem(
                "watchedVideos",
                JSON.stringify(watchedVideos)
              );
            }
          } catch (error) {
            console.error("Error saving watched status:", error);
          }
        };
        saveWatchedStatus();
      }
    },
    [topicTitle]
  );

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  const handleContinueToNotes = () => {
    // Navigate to imageViewer with the images
    router.replace({
      pathname: "/other/imageViewer",
      params: {
        images: images as string,
        title: title as string,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>
            {topicTitle}
          </Text>
        </View>
      </View>

      <View style={styles.videoContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF8C00" />
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}

        {videoId && (
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
            onReady={onReady}
            webViewStyle={styles.webView}
            webViewProps={{
              allowsInlineMediaPlayback: true,
            }}
            initialPlayerParams={{
              modestbranding: true,
              controls: true,
              rel: false,
            }}
          />
        )}
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Text style={{ fontSize: 15, color: "#666", textAlign: "center" }}>
          Watch the video lesson for this topic.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  videoContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },
  webView: {
    borderRadius: 12,
  },
  infoContainer: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  messageContainer: {
    alignItems: "center",
    gap: 16,
  },
  messageText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  messageTextSuccess: {
    fontSize: 15,
    color: "#4CAF50",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "600",
    paddingHorizontal: 20,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF8C00",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    gap: 8,
    marginTop: 10,
    width: "80%",
  },
  continueButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButtonTextDisabled: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Videoscreen;