import { View, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import * as ScreenCapture from "expo-screen-capture";
import ScreenshotPrevent from "react-native-screenshot-prevent";
import ImageZoomViewer from 'react-native-image-zoom-viewer';

const { width, height } = Dimensions.get('window');

export default function ImageViewer() {
  const { images, title } = useLocalSearchParams();
  const router = useRouter();
  const imageData = JSON.parse(images as string);

  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
    ScreenCapture.preventScreenCaptureAsync();
    
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

return (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => router.back()}
    >
      <MaterialIcons name="close" size={30} color="white" />
    </TouchableOpacity>
    
    <ImageZoomViewer
      imageUrls={imageData.map((imageUrl: string) => ({
        url: `https://sbsapp.com.ng/${imageUrl}`
      }))}
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
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 50,
  },
  image: {
    width: width,
    height: height * 0.8,
    marginBottom: 20,
  },
});