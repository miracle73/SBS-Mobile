// components/ScreenProtection.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useScreenRecordingPrevention } from "../hooks/useScreenRecordingPrevention";
import { MaterialIcons } from "@expo/vector-icons";

interface ScreenProtectionProps {
  children: React.ReactNode;
  strictMode?: boolean;
  showWarningOverlay?: boolean; // Show overlay when recording detected
  customWarningComponent?: React.ReactNode;
}

const ScreenProtection: React.FC<ScreenProtectionProps> = ({
  children,
  strictMode = false,
  showWarningOverlay = true,
  customWarningComponent,
}) => {
  const [isRecordingDetected, setIsRecordingDetected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { manuallyCheckRecording } = useScreenRecordingPrevention({
    showAlert: !showWarningOverlay, // Don't show alert if we're showing overlay
    redirectOnViolation: false,
    onScreenRecordingDetected: () => {
      setIsRecordingDetected(true);
      if (showWarningOverlay) {
        setShowModal(true);
      }
      if (strictMode) {
        // Exit app after a delay
        setTimeout(() => {
          BackHandler.exitApp();
        }, 3000);
      }
    },
  });

  useEffect(() => {
    // Check recording status on mount
    const checkInitialStatus = async () => {
      const isRecording = await manuallyCheckRecording();
      setIsRecordingDetected(isRecording);
      if (isRecording && showWarningOverlay) {
        setShowModal(true);
      }
    };

    checkInitialStatus();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsRecordingDetected(false);
  };

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const renderWarningOverlay = () => {
    if (customWarningComponent) {
      return customWarningComponent;
    }

    return (
      <View style={styles.overlayContent}>
        <MaterialIcons name="warning" size={80} color="#FF6B6B" />
        <Text style={styles.warningTitle}>Screen Recording Detected</Text>
        <Text style={styles.warningMessage}>
          For security reasons, this app cannot be used while screen recording
          is active. Please stop recording to continue.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.buttonText}>I've Stopped Recording</Text>
          </TouchableOpacity>

          {strictMode && (
            <TouchableOpacity style={styles.exitButton} onPress={handleExitApp}>
              <Text style={styles.buttonText}>Exit App</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {children}

      {showWarningOverlay && (
        <Modal
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>{renderWarningOverlay()}</View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  overlayContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    maxWidth: 350,
    width: "100%",
  },
  warningTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  warningMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  dismissButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  exitButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ScreenProtection;
