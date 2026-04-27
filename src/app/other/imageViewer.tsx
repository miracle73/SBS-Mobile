import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import * as ScreenCapture from "expo-screen-capture";
import ScreenshotPrevent from "react-native-screenshot-prevent";
import ImageZoomViewer from "react-native-image-zoom-viewer";

const { width, height } = Dimensions.get("window");

export default function ImageViewer() {
  const { images, title, videoUrl } = useLocalSearchParams();
  const router = useRouter();
  const imageData: string[] = JSON.parse(images as string);
  const hasVideo = videoUrl && (videoUrl as string).trim() !== "";

  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const imageUrls = imageData.map((imageUrl: string) => {
    if (imageUrl.startsWith("file://") || imageUrl.startsWith("http")) {
      return { url: imageUrl };
    }
    return { url: `https://sbsapp.com.ng/${imageUrl}` };
  });

  return (
    <View style={styles.container}>
      {hasVideo && (
        <TouchableOpacity
          style={styles.videoButton}
          onPress={() =>
            router.push({
              pathname: "/other/videoscreen",
              params: {
                videoUrl: videoUrl as string,
                topicTitle: title as string,
                images: images as string,
                title: title as string,
              },
            })
          }
        >
          <MaterialIcons name="play-circle-outline" size={28} color="#FF8C00" />
        </TouchableOpacity>
      )}

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
        onLongPress={() => {}}
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
  videoButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
});