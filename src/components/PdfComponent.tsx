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
import React, { useState, useCallback, useEffect } from "react";
import Pdf from "react-native-pdf";
import YoutubePlayer from "react-native-youtube-iframe";
import { useScreenRecordingPrevention } from "../hooks/useScreenRecordingPrevention";
import ScreenProtection from "./ScreenProtection";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenCapture from "expo-screen-capture";
import ScreenshotPrevent from "react-native-screenshot-prevent";

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
  const [isProtected, setIsProtected] = useState(false);
  const isFocused = useIsFocused();

  const activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
  };

  const deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
  };

  if (isFocused) {
    activate();
  }
  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
  }, []);

  const { manuallyCheckRecording, enablePrevention, isProtectionEnabled } =
    useScreenRecordingPrevention({
      showAlert: false, // We'll handle this manually
      redirectOnViolation: false, // We'll close the modal instead
      customMessage:
        "Access to lecture notes is restricted while screen recording is active.",
      onScreenRecordingDetected: () => {
        console.log(
          "Unauthorized screen recording attempt detected in PDF/Video section"
        );
        handleSecurityViolation();
      },
    });

  // Handle security violation by closing the modal
  const handleSecurityViolation = () => {
    Alert.alert(
      "Security Alert",
      "Screen recording detected. Access to this content is restricted for security reasons.",
      [
        {
          text: "OK",
          onPress: () => {
            setModal(false); // Close the modal
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Check for screen recording when modal opens
  useEffect(() => {
    if (modal) {
      const checkAndEnableProtection = async () => {
        try {
          // Enable protection when modal opens
          await enablePrevention();

          // Check if recording is active
          const isRecording = await manuallyCheckRecording();
          if (isRecording) {
            handleSecurityViolation();
            return;
          }

          setIsProtected(true);
        } catch (error) {
          console.error("Failed to enable protection for PDF/Video:", error);
          // If we can't enable protection, assume recording and close modal
          handleSecurityViolation();
        }
      };

      checkAndEnableProtection();

      // Continuous monitoring while modal is open
      const intervalId = setInterval(async () => {
        try {
          const isRecording = await manuallyCheckRecording();
          if (isRecording) {
            clearInterval(intervalId);
            handleSecurityViolation();
          }
        } catch (error) {
          console.error("Error during continuous monitoring:", error);
        }
      }, 3000); // Check every 3 seconds

      return () => {
        clearInterval(intervalId);
        setIsProtected(false);
      };
    }
  }, [modal]);

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string) => {
    if (!url) return null;

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
    }
  }, []);

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback((error: string) => {
    setLoading(false);
    console.error("Video error:", error);
  }, []);

  const handleCloseVideo = () => {
    setShowVideo(false);
    setPlaying(false);
  };

  const handleCloseModal = () => {
    setPlaying(false);
    setModal(false);
  };

  // Don't render content until protection is enabled
  if (modal && !isProtected) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.loadingModalContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingModalText}>Securing content...</Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={handleCloseModal}
    >
      <ScreenProtection
        strictMode={true}
        showWarningOverlay={true}
        customWarningComponent={
          <View style={styles.customWarning}>
            <Text style={styles.warningTitle}>Protected Content</Text>
            <Text style={styles.warningMessage}>
              This content is protected and cannot be accessed while screen
              recording is active.
            </Text>
            <TouchableOpacity
              style={styles.warningButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.warningButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          {/* Close button at the top */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>✕ Close</Text>
            </TouchableOpacity>
          </View>

          {/* Video Section */}
          {showVideo && (
            <View style={styles.videoSection}>
              <View style={styles.videoHeader}>
                <View style={styles.videoHeaderLeft}>
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
                      if (element) {
                        element.style.position = 'unset';
                        element.style.paddingBottom = 'unset';
                      }
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
                console.log(`PDF loaded: ${numberOfPages} pages`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page} of ${numberOfPages}`);
              }}
              onError={(error) => {
                console.log("PDF error:", error);
                setSecondModal(true);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={{ flex: 1, alignSelf: "stretch" }}
            />
          </View>

          {/* Error overlay for PDF */}
          {secondModal && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                File not in PDF format or corrupted
              </Text>
              <TouchableOpacity
                style={styles.errorButton}
                onPress={() => setSecondModal(false)}
              >
                <Text style={styles.errorButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </ScreenProtection>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
  },
  loadingModalText: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalCloseButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalCloseText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  customWarning: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    maxWidth: 350,
  },
  warningTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 15,
    textAlign: "center",
  },
  warningMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 25,
  },
  warningButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  warningButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  videoSection: {
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
  pdfContainer: {
    flex: 1,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PdfComponent;
