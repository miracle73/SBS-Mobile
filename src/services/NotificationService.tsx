// services/NotificationService.tsx
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetTodayNotificationsResponse,
  ProcessedNotification,
  NotificationServiceInterface,
} from "../types/notification";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService implements NotificationServiceInterface {
  public token: string | null = null;
  private notificationListener: Notifications.Subscription | null = null;
  private responseListener: Notifications.Subscription | null = null;

  // Register for push notifications
  async registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token: Notifications.ExpoPushToken | undefined = undefined;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return undefined;
      }

      // Get the token that uniquely identifies this device
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      this.token = token.data;

      // Store token locally
      await AsyncStorage.setItem("expoPushToken", token.data);

      console.log("Push token:", token.data);

      return token.data;
    } else {
      alert("Must use physical device for Push Notifications");
      return undefined;
    }
  }

  // Set up notification listeners
  setupNotificationListeners(): void {
    // Listener for notifications received while app is running
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification: Notifications.Notification) => {
        console.log("Notification received:", notification);
        this.handleNotificationReceived(notification);
      }
    );

    // Listener for when user taps on notification
    this.responseListener =
      Notifications.addNotificationResponseReceivedListener(
        (response: Notifications.NotificationResponse) => {
          console.log("Notification response:", response);
          this.handleNotificationResponse(response);
        }
      );
  }

  // Handle notification received while app is active
  private handleNotificationReceived(
    notification: Notifications.Notification
  ): void {
    const data = notification.request.content.data;
    const { title, message } = data || {};

    // You can customize this behavior
    console.log(`Received: ${title} - ${message}`);

    // Optionally show in-app notification or update UI
  }

  // Handle notification tap
  private handleNotificationResponse(
    response: Notifications.NotificationResponse
  ): void {
    const notification = response.notification;
    const data = notification.request.content.data;

    // Navigate to specific screen based on notification data
    console.log("User tapped notification:", data);

    // Example: Navigate to specific screen
    // if (data.screen) {
    //   navigation.navigate(data.screen, data.params);
    // }
  }

  // Fetch notifications from your API
  // Fetch notifications from your API
  async fetchNotifications(): Promise<ProcessedNotification[]> {
    try {
      // Import the store and dispatch the mutation
      const { store } = require("../components/redux/store");
      const { userApi } = require("../components/services/userService");

      // Dispatch the mutation
      const result = await store.dispatch(
        userApi.endpoints.getTodayNotifications.initiate({})
      );

      if (result.error) {
        throw new Error("Failed to fetch notifications from API");
      }

      const notificationData = result.data;

      // Since your API returns { detail: string }, we need to adapt it
      // Assuming the detail contains the notification content
      const notifications: ProcessedNotification[] = [
        {
          id: `notification_${Date.now()}_${Math.random()}`,
          title: "Today's Notification",
          message: notificationData.detail,
          createdAt: new Date(),
          isRead: false,
        },
      ];

      return notifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
  // async fetchNotifications(): Promise<ProcessedNotification[]> {
  //   try {
  //     // Replace with your actual API endpoint
  //     const response = await fetch("YOUR_API_ENDPOINT_HERE/notifications");

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const notifications: NotificationData[] = await response.json();

  //     // Process notifications
  //     return notifications.map((notification: NotificationData) => ({
  //       id: `notification_${Date.now()}_${Math.random()}`,
  //       title: notification.title,
  //       message: notification.message,
  //       createdAt: new Date(notification.created_at),
  //       isRead: false,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //     throw error;
  //   }
  // }

  // Send local notification (for testing or offline notifications)
  async sendLocalNotification(
    title: string,
    message: string,
    data: Record<string, any> = {}
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        data,
      },
      trigger: null, // Send immediately
    });
  }

  // Schedule notification for later
  // Schedule notification for later
  async scheduleNotification(
    title: string,
    message: string,
    triggerDate: Date,
    data: Record<string, any> = {}
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        data,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  }

  // Cancel all scheduled notifications
  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Remove listeners (call in component cleanup)
  removeListeners(): void {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }

  // Get notification history from AsyncStorage
  async getStoredNotifications(): Promise<ProcessedNotification[]> {
    try {
      const stored = await AsyncStorage.getItem("notifications");
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((notif: any) => ({
        ...notif,
        createdAt: new Date(notif.createdAt),
      }));
    } catch (error) {
      console.error("Error getting stored notifications:", error);
      return [];
    }
  }

  // Store notifications locally
  async storeNotifications(
    notifications: ProcessedNotification[]
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error("Error storing notifications:", error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<ProcessedNotification[]> {
    try {
      const notifications = await this.getStoredNotifications();
      const updated = notifications.map((notif: ProcessedNotification) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      );
      await this.storeNotifications(updated);
      return updated;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }

  // Get unread notification count
  async getUnreadCount(): Promise<number> {
    try {
      const notifications = await this.getStoredNotifications();
      return notifications.filter(
        (notif: ProcessedNotification) => !notif.isRead
      ).length;
    } catch (error) {
      console.error("Error getting unread count:", error);
      return 0;
    }
  }
}

// Export singleton instance
export default new NotificationService();
