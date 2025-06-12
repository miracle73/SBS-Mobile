import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const videoscreen = () => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // Extract video ID from YouTube URL
  const videoId = "dQw4w9WgXcQ"; // Rick Astley - Never Gonna Give You Up

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video Ended", "The video has finished playing!");
    }
  }, []);

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback((error: string) => {
    setLoading(false);
    Alert.alert("Error", `Failed to load video: ${error}`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.title}>YouTube Video Player</Text>
        <Text style={styles.subtitle}>Enjoy your video content</Text>
      </View>

      <View style={styles.videoContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}

        <YoutubePlayer
          height={220}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          onReady={onReady}
          onError={onError}
          webViewStyle={styles.webView}
          webViewProps={{
            injectedJavaScript: `
              var element = document.getElementsByClassName('container')[0];
              element.style.position = 'unset';
              element.style.paddingBottom = 'unset';
              true;
            `,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.videoTitle}>
          Rick Astley - Never Gonna Give You Up
        </Text>
        <Text style={styles.videoDescription}>
          The official video for "Never Gonna Give You Up" by Rick Astley. A
          classic that never gets old!
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.4B</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15M</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>
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
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  videoContainer: {
    margin: 20,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontSize: 16,
  },
  webView: {
    borderRadius: 12,
  },
  infoContainer: {
    padding: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default videoscreen;
