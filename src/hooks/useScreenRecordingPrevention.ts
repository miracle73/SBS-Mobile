// hooks/useScreenRecordingPrevention.ts
import { useEffect, useRef, useState } from "react";
import * as ScreenCapture from "expo-screen-capture";
import { AppState, AppStateStatus, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";

interface UseScreenRecordingPreventionOptions {
  showAlert?: boolean;
  redirectOnViolation?: boolean;
  redirectPath?: string;
  customMessage?: string;
  onScreenRecordingDetected?: () => void;
}

export const useScreenRecordingPrevention = (
  options: UseScreenRecordingPreventionOptions = {}
) => {
  const {
    showAlert = true,
    redirectOnViolation = false,
    redirectPath = "/home",
    customMessage = "Screen recording is not allowed for security reasons.",
    onScreenRecordingDetected,
  } = options;

  const router = useRouter();
  const isRecordingRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(false);

  useEffect(() => {
    let isActive = true;
    let screenCaptureListener: ScreenCapture.Subscription | null = null;

    const enableScreenCapturePrevention = async () => {
      try {
        // Prevent screen capture/recording
        await ScreenCapture.preventScreenCaptureAsync();
        setIsProtectionEnabled(true);
        console.log("Screen recording prevention enabled");
      } catch (error) {
        console.error("Failed to enable screen recording prevention:", error);
        setIsProtectionEnabled(false);
      }
    };

    const setupScreenCaptureListener = () => {
      try {
        // Set up listener for screen capture events (iOS only)
        if (Platform.OS === "ios") {
          screenCaptureListener = ScreenCapture.addScreenshotListener(() => {
            console.log(
              "Screenshot taken - potential screen recording activity"
            );
            handleSecurityViolation();
          });
        }
      } catch (error) {
        console.error("Failed to setup screen capture listener:", error);
      }
    };

    const handleSecurityViolation = () => {
      if (!isRecordingRef.current) {
        isRecordingRef.current = true;
        console.log("Potential screen recording/capture detected!");

        // Handle screen recording detection
        if (onScreenRecordingDetected) {
          onScreenRecordingDetected();
        }

        if (showAlert) {
          Alert.alert(
            "Security Alert",
            customMessage,
            [
              {
                text: "OK",
                onPress: () => {
                  isRecordingRef.current = false;
                  if (redirectOnViolation) {
                    router.replace(redirectPath);
                  }
                },
              },
            ],
            { cancelable: false }
          );
        }

        if (redirectOnViolation && !showAlert) {
          router.replace(redirectPath);
        }

        // Reset the flag after a delay
        setTimeout(() => {
          isRecordingRef.current = false;
        }, 5000);
      }
    };

    const checkProtectionStatus = async () => {
      try {
        // Since we can't directly check if recording is happening,
        // we ensure our protection is still active
        if (!isProtectionEnabled) {
          await enableScreenCapturePrevention();
        }
      } catch (error) {
        console.error("Error checking protection status:", error);
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // App has come to the foreground, re-enable protection
        if (isActive) {
          checkProtectionStatus();
        }
      }
      appStateRef.current = nextAppState;
    };

    // Initialize screen capture prevention
    enableScreenCapturePrevention();
    setupScreenCaptureListener();

    // Set up app state listener
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Periodically check and re-enable protection
    const intervalId = setInterval(() => {
      if (isActive) {
        checkProtectionStatus();
      }
    }, 5000); // Check every 5 seconds

    return () => {
      isActive = false;
      clearInterval(intervalId);
      subscription?.remove();

      // Remove screen capture listener
      if (screenCaptureListener) {
        screenCaptureListener.remove();
      }

      // Re-allow screen capture when component unmounts (optional)
      ScreenCapture.allowScreenCaptureAsync().catch((error) => {
        console.error("Failed to re-allow screen capture:", error);
      });
    };
  }, [
    showAlert,
    redirectOnViolation,
    redirectPath,
    customMessage,
    onScreenRecordingDetected,
    router,
  ]);

  const manuallyCheckRecording = async (): Promise<boolean> => {
    try {
      // Since we can't directly detect recording, we check if our protection is active
      // If protection fails to enable, it might indicate recording software is interfering
      await ScreenCapture.preventScreenCaptureAsync();
      return false; // No recording detected if we can enable prevention
    } catch (error) {
      console.error(
        "Error checking screen recording (protection may be blocked):",
        error
      );
      return true; // Assume recording if we can't enable protection
    }
  };

  const enablePrevention = async (): Promise<void> => {
    try {
      await ScreenCapture.preventScreenCaptureAsync();
      setIsProtectionEnabled(true);
    } catch (error) {
      console.error("Failed to enable screen recording prevention:", error);
      setIsProtectionEnabled(false);
      throw error;
    }
  };

  const disablePrevention = async (): Promise<void> => {
    try {
      await ScreenCapture.allowScreenCaptureAsync();
      setIsProtectionEnabled(false);
    } catch (error) {
      console.error("Failed to disable screen recording prevention:", error);
      throw error;
    }
  };

  return {
    manuallyCheckRecording,
    enablePrevention,
    disablePrevention,
    isRecording: isRecordingRef.current,
    isProtectionEnabled,
  };
};
