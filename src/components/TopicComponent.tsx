import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { SecondPadlockIcon } from "../../assets/svg";
import { useRouter } from "expo-router";
import SubscriptionModal from "./modals/SubscriptionModal";
import {
  useGetTopicContentMutation,
  useUserActivatedStatusMutation,
} from "../components/services/userService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenCapture from "expo-screen-capture";
import ScreenshotPrevent from "react-native-screenshot-prevent";
import ImageCacheService from "../services/ImageCacheService";

interface TopicComponentProps {
  title: string;
  id: number;
  free: boolean;
  courseName: string;
  level: string;
  onPdfOpen?: (pdfData: any) => void;
}

const TopicComponent: React.FC<TopicComponentProps> = ({
  title,
  id,
  free,
  courseName,
  level,
  onPdfOpen,
}) => {
  const [uuid, setUuid] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showImageText, setShowImageText] = useState(false);
  const [imageData, setImageData] = useState<string[]>([]);
  const [caching, setCaching] = useState(false);

  useEffect(() => {
    const fetchStoredUuid = async () => {
      try {
        let storedUuid = await AsyncStorage.getItem("device_uuid");
        if (storedUuid) setUuid(storedUuid);
      } catch (error) {
        console.error("Error fetching UUID:", error);
      }
    };
    fetchStoredUuid();
  }, []);

  const phoneImei = uuid;
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [getTopicContent] = useGetTopicContentMutation();
  const [userActivatedStatus] = useUserActivatedStatusMutation();
  const isFocused = useIsFocused();

  if (isFocused) {
    ScreenCapture.preventScreenCaptureAsync();
  }

  useEffect(() => {
    ScreenshotPrevent.enableSecureView();
  }, []);

  interface ActivationMessage {
    semester: string;
    level: number;
    user_id: number;
    id: number;
    is_activated: boolean;
  }

  const [filteredMessage, setFilteredMessage] =
    React.useState<ActivationMessage | null>(null);

  // Check if user has watched the video for this topic
  const hasWatchedVideo = async (): Promise<boolean> => {
    try {
      const stored = await AsyncStorage.getItem("watchedVideos");
      const watchedVideos: string[] = stored ? JSON.parse(stored) : [];
      return watchedVideos.includes(title);
    } catch {
      return false;
    }
  };

  // Navigate to content — either video gate or image viewer
  const navigateToContent = async (images: string[], videoUrl?: string | null) => {
    const hasVideo = videoUrl && videoUrl.trim() !== "";
    const watched = await hasWatchedVideo();

    if (hasVideo && !watched) {
      // First time + has video → force video gate
      router.push({
        pathname: "/other/videoscreen",
        params: {
          videoUrl: videoUrl!,
          topicTitle: title,
          images: JSON.stringify(images),
          title: title,
        },
      });
    } else {
      // No video or already watched → go straight to images
      router.push({
        pathname: "/other/imageViewer",
        params: {
          images: JSON.stringify(images),
          title: title,
        },
      });
    }
  };

  const handlePress = async () => {
    setShowImage(!showImage);

    // Check activation for non-free topics
    if (!free) {
      try {
        const netInfo = await NetInfo.fetch();

        if (netInfo.isConnected) {
          const activationStatus = await userActivatedStatus({
            phone_imei: phoneImei,
          }).unwrap();

          await AsyncStorage.setItem(
            "activationMessage",
            JSON.stringify(activationStatus.message)
          );

          const msg = activationStatus.message.find(
            (m) => m.level == parseInt(level)
          );

          if (!msg || !msg.is_activated) {
            setFilteredMessage(null);
            setModal(true);
            return;
          } else {
            setFilteredMessage(msg);
          }
        } else {
          const storedMessage = await AsyncStorage.getItem("activationMessage");
          if (storedMessage) {
            const parsedMessage = JSON.parse(storedMessage);
            const msg = parsedMessage.find(
              (m: any) => m.level === parseInt(level)
            );
            if (!msg || !msg.is_activated) {
              setModal(true);
              return;
            }
          } else {
            throw new Error("Activation status not found in storage.");
          }
        }
      } catch (error) {
        console.error("Error fetching activation status:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to verify activation status.",
        });
        return;
      }
    }

    // Fetch topic content
    try {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        // ONLINE
        const result = await getTopicContent({
          phone_imei: uuid,
          topic_id: id,
        }).unwrap();

        if (result?.topic_images) {
          if (result.topic_images.length === 0) {
            setShowImageText(true);
            return;
          }

          setImageData(result.topic_images);

          // Cache topic content for offline use
          await AsyncStorage.setItem(
            `cachedTopicContent_${title}`,
            JSON.stringify({
              topic_images: result.topic_images,
              topic_video: result.topic_video,
            })
          );

          // Cache images in background for offline use
          setCaching(true);
          ImageCacheService.cacheImages(result.topic_images)
            .then(() => {
              console.log(`Cached ${result.topic_images.length} images for: ${title}`);
            })
            .catch((err) => console.error("Cache error:", err))
            .finally(() => setCaching(false));

          // Navigate — pass topic_video from API response
          await navigateToContent(result.topic_images, result.topic_video);
        } else {
          setImageData([]);
          setShowImageText(true);
        }
      } else {
        // OFFLINE — use cached topic content
        const cachedContent = await AsyncStorage.getItem(`cachedTopicContent_${title}`);

        if (!cachedContent) {
          Toast.show({
            type: "info",
            text1: "Not Available Offline",
            text2: "Open this topic while online first to cache it for offline use.",
          });
          return;
        }

        const parsedContent = JSON.parse(cachedContent);

        if (!parsedContent.topic_images || parsedContent.topic_images.length === 0) {
          setShowImageText(true);
          return;
        }

        // Check if images are cached locally
        const cachedImages = await ImageCacheService.getCachedImages(
          parsedContent.topic_images
        );

        if (cachedImages) {
          await navigateToContent(cachedImages, parsedContent.topic_video);
        } else {
          Toast.show({
            type: "info",
            text1: "Not Available Offline",
            text2: "Open this topic while online first to cache it for offline use.",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching topic content:", error);
      const errorMessage =
        (error as any)?.message || "Failed to fetch topic content.";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 20,
          marginBottom: 10,
        }}
      >
        <View style={styles.Container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.firstText}>{title}</Text>
            {caching && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <ActivityIndicator size="small" color="#FF8C00" />
                <Text style={{ fontSize: 10, color: "#999" }}>
                  Caching for offline...
                </Text>
              </View>
            )}
          </View>
          {!free ? (
            filteredMessage ? (
              <EvilIcons name="unlock" size={15} />
            ) : (
              <SecondPadlockIcon />
            )
          ) : null}
        </View>
      </TouchableOpacity>
      {showImage && showImageText && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "#666" }}>
            No content available
          </Text>
        </View>
      )}
      {modal && <SubscriptionModal setModal={setModal} modal={modal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstText: {
    fontSize: 16,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#000000",
    marginBottom: 5,
  },
});

export default TopicComponent;