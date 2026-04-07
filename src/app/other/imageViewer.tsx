import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import * as ScreenCapture from "expo-screen-capture";
import ScreenshotPrevent from "react-native-screenshot-prevent";
import ImageZoomViewer from "react-native-image-zoom-viewer";

const { width, height } = Dimensions.get("window");

export default function ImageViewer() {
  const { images, title } = useLocalSearchParams();
  const router = useRouter();
  const imageData: string[] = JSON.parse(images as string);

  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  // Build image URLs — support both local (file://) and remote paths
  const imageUrls = imageData.map((imageUrl: string) => {
    if (imageUrl.startsWith("file://") || imageUrl.startsWith("http")) {
      // Already a full URL (cached local file or full remote URL)
      return { url: imageUrl };
    }
    // Relative path from API — prepend base URL
    return { url: `https://sbsapp.com.ng/${imageUrl}` };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="close" size={30} color="white" />
      </TouchableOpacity>

      <ImageZoomViewer
        imageUrls={imageUrls}
        enableSwipeDown
        onSwipeDown={() => router.back()}
        backgroundColor="#000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
});