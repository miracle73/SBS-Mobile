import {
  View,
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import Pdf from "react-native-pdf";
import YoutubePlayer from "react-native-youtube-iframe";
import Toast from "react-native-toast-message";

interface PDF {
  uri: string;
  cache: boolean;
}
interface PdfComponentModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  pdfUrl: PDF;
  video: string;
}

const PdfComponent = ({
  setModal,
  modal,
  pdfUrl,
  video,
}: PdfComponentModalProps) => {
  const [secondModal, setSecondModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // Extract video ID from YouTube URL
  const videoIdd = "dQw4w9WgXcQ"; // Rick Astley - Never Gonna Give You Up

  const extractVideoId = (url: string) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
      /[?&]v=([^&]+)/, // Standard: ?v=VIDEO_ID or &v=VIDEO_ID
      /\/embed\/([^?&]+)/, // Embed: /embed/VIDEO_ID
      /\/watch\?v=([^&]+)/, // Watch: /watch?v=VIDEO_ID
      /youtu\.be\/([^?&]+)/, // Short: youtu.be/VIDEO_ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = extractVideoId(video) ?? undefined;

  const [showVideo, setShowVideo] = useState(!!videoId);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Video Ended, The video has finished playing!",
      });
      // Alert.alert("Video Ended", "The video has finished playing!");
    }
  }, []);

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback((error: string) => {
    setLoading(false);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: `Failed to load video: ${error}`,
    });
    // Alert.alert("Error", `Failed to load video: ${error}`);
  }, []);

  const handleCloseVideo = () => {
    setShowVideo(false);
    setPlaying(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      visible={modal}
      onRequestClose={() => {
        setModal(!modal);
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Video Section */}
        {showVideo && (
          <View style={styles.videoSection}>
            <View style={styles.videoHeader}>
              <View style={styles.videoHeaderLeft}>
                {/* <Text style={styles.videoTitle}>YouTube Video Player</Text> */}
                <Text style={styles.videoSubtitle}>Watch before reading</Text>
              </View>
              <TouchableOpacity
                onPress={handleCloseVideo}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.videoContainer}>
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#FF0000" />
                  <Text style={styles.loadingText}>Loading video...</Text>
                </View>
              )}

              <YoutubePlayer
                height={200}
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
          </View>
        )}

        {/* PDF Section */}
        <View style={[styles.pdfContainer, { flex: showVideo ? 1 : 1 }]}>
          <Pdf
            trustAllCerts={false}
            source={pdfUrl}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${numberOfPages}`);
            }}
            onError={(error) => {
              console.log(error);
              setSecondModal(true);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{ flex: 1, alignSelf: "stretch" }}
          />
        </View>

        {secondModal && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>File not in PDF format or corrupted</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  videoSection: {
    // backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingBottom: 10,
  },
  videoHeaderLeft: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  videoSubtitle: {
    fontSize: 17,
    color: "#666",
    marginTop: 2,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  videoContainer: {
    margin: 15,
    marginTop: 5,
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
    fontSize: 14,
  },
  webView: {
    borderRadius: 12,
  },
  infoContainer: {
    padding: 15,
    paddingTop: 10,
  },
  videoTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  videoDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  statLabel: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  pdfContainer: {
    flex: 1,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PdfComponent;
