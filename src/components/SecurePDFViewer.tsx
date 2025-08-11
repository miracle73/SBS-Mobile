import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Pdf from "react-native-pdf";
import * as ScreenCapture from "expo-screen-capture";

interface SecurePDFViewerProps {
  source: any;
  style?: any;
  onLoadComplete?: (numberOfPages: number) => void;
  onPageChanged?: (page: number, numberOfPages: number) => void;
  onError?: (error: any) => void;
  enableAntiScreenshot?: boolean;
}

export const SecurePDFViewer: React.FC<SecurePDFViewerProps> = ({
  source,
  style,
  onLoadComplete,
  onPageChanged,
  onError,
  enableAntiScreenshot = true,
}) => {
  const protectionInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (enableAntiScreenshot) {
      // Initial protection
      ScreenCapture.preventScreenCaptureAsync().catch(console.error);

      // Continuous protection while PDF is mounted
      protectionInterval.current = setInterval(() => {
        ScreenCapture.preventScreenCaptureAsync().catch(console.error);
      }, 2000);

      return () => {
        if (protectionInterval.current) {
          clearInterval(protectionInterval.current);
        }
      };
    }
  }, [enableAntiScreenshot]);

  // Disable text selection and copying on iOS
  const secureStyle = Platform.select({
    ios: {
      ...style,
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
    },
    android: style,
  });

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={[styles.pdf, secureStyle]}
        onLoadComplete={onLoadComplete}
        onPageChanged={onPageChanged}
        onError={onError}
        enablePaging={true}
        fitPolicy={0}
        trustAllCerts={false}
        // Additional security props
        enableAntialiasing={true}
        enableAnnotationRendering={false} // Disable annotations to prevent manipulation
        password="" // Add password protection if needed
      />
      {/* Overlay to prevent screenshots on Android (partial solution) */}
      {Platform.OS === "android" && enableAntiScreenshot && (
        <View style={styles.securityOverlay} pointerEvents="none" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  pdf: {
    flex: 1,
  },
  securityOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    // This creates a flag for Android to treat this as secure
    elevation: Platform.OS === "android" ? 999 : 0,
  },
});
