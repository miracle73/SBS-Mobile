// hooks/useNotifications.tsx
import { useState, useEffect, useCallback } from "react";
import { AppState, AppStateStatus } from "react-native";
import NotificationService from "../services/NotificationService";
import {
  ProcessedNotification,
  UseNotificationsReturn,
} from "../types/notification";
import { useGetTodayNotificationsMutation } from "../components/services/userService";
const { store } = require("../components/redux/store");
const { userApi } = require("../components/services/userService");

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<ProcessedNotification[]>(
    []
  );
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [getTodayNotifications] = useGetTodayNotificationsMutation();

  // Initialize notifications
  useEffect(() => {
    initializeNotifications();
    const cleanup = setupAppStateListener();

    return () => {
      NotificationService.removeListeners();
      cleanup();
    };
  }, []);

  // Initialize notification service
  const initializeNotifications = async (): Promise<void> => {
    try {
      setLoading(true);

      // Register for push notifications (now fixed!)
      await NotificationService.registerForPushNotificationsAsync();

      // Setup listeners for local notifications only
      NotificationService.setupNotificationListeners();

      // Load stored notifications
      await loadNotifications();

      // Fetch fresh notifications from API
      await fetchNotifications();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error initializing notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Setup app state listener to refresh notifications when app becomes active
  const setupAppStateListener = (): (() => void) => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (nextAppState === "active") {
        fetchNotifications();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  };

  // Load notifications from local storage
  const loadNotifications = async (): Promise<void> => {
    try {
      const stored = await NotificationService.getStoredNotifications();
      setNotifications(stored);
      updateUnreadCount(stored);
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  };

  // Fetch notifications from API
  const fetchNotifications = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from your API using RTK Query
      const apiResult = await getTodayNotifications({}).unwrap();

      let apiNotifications: ProcessedNotification[] = [];

      // Check if the response is an array (has notifications) or object (no notifications)
      if (Array.isArray(apiResult)) {
        // Has notifications - convert to ProcessedNotification format
        apiNotifications = apiResult.map((notification) => ({
          id: `notification_${Date.now()}_${Math.random()}_${
            notification.title
          }`,
          title: notification.title,
          message: notification.message,
          createdAt: new Date(notification.created_at),
          isRead: false,
        }));
      } else if (apiResult.detail) {
        // No notifications - the API returned { detail: "some message" }
        console.log("No notifications available:", apiResult.detail);
        // You can optionally create a notification from the detail message
        // or just leave apiNotifications as empty array
      }

      const storedNotifications =
        await NotificationService.getStoredNotifications();

      // Merge API notifications with stored ones (avoid duplicates)
      const merged = mergeNotifications(storedNotifications, apiNotifications);

      setNotifications(merged);
      updateUnreadCount(merged);

      // Store updated notifications
      await NotificationService.storeNotifications(merged);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch notifications";
      setError(errorMessage);
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [getTodayNotifications]);

  // Merge notifications avoiding duplicates
  const mergeNotifications = (
    stored: ProcessedNotification[],
    fresh: ProcessedNotification[]
  ): ProcessedNotification[] => {
    const storedMap = new Map(
      stored.map((n) => [
        `${n.title}-${n.message}-${n.createdAt.toISOString()}`,
        n,
      ])
    );

    fresh.forEach((freshNotif) => {
      const key = `${freshNotif.title}-${
        freshNotif.message
      }-${freshNotif.createdAt.toISOString()}`;
      if (!storedMap.has(key)) {
        storedMap.set(key, freshNotif);
      }
    });

    return Array.from(storedMap.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  // Update unread count
  const updateUnreadCount = (
    notificationList: ProcessedNotification[]
  ): void => {
    const count = notificationList.filter((n) => !n.isRead).length;
    setUnreadCount(count);
  };

  // Mark notification as read
  const markAsRead = useCallback(
    async (notificationId: string): Promise<void> => {
      try {
        const updated = await NotificationService.markAsRead(notificationId);
        setNotifications(updated);
        updateUnreadCount(updated);
      } catch (err) {
        console.error("Error marking notification as read:", err);
      }
    },
    []
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(async (): Promise<void> => {
    try {
      const updated = notifications.map((n) => ({ ...n, isRead: true }));
      await NotificationService.storeNotifications(updated);
      setNotifications(updated);
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  }, [notifications]);

  // Clear all notifications
  const clearAllNotifications = useCallback(async (): Promise<void> => {
    try {
      await NotificationService.storeNotifications([]);
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  }, []);

  // Send test notification
  const sendTestNotification = useCallback(async (): Promise<void> => {
    try {
      const result = await store.dispatch(
        userApi.endpoints.getTodayNotifications.initiate({})
      );

      if (result.error) {
        throw new Error("Failed to fetch notifications from API");
      }

      const notificationData = result.data;

      // await NotificationService.sendLocalNotification(
      //   "Test Notification",
      //   "This is a test notification from your SBS Mobile app!"
      // );
      // Check if the response is an array (has notifications) or object (no notifications)
      if (Array.isArray(notificationData)) {
        // Has notifications - loop through each and send local notification
        console.log(`Sending ${notificationData.length} notifications...`);

        for (const notification of notificationData) {
          await NotificationService.sendLocalNotification(
            notification.title,
            notification.message
          );
        }

        console.log(
          `Successfully sent ${notificationData.length} notifications`
        );
      } else if (notificationData?.detail) {
        // No notifications - don't send any
        console.log("No notifications to send5678:", notificationData.detail);
      } else {
        console.log("Unexpected notification data format:", notificationData);
      }
    } catch (err) {
      console.error("Error sending test notification:", err);
    }
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    sendTestNotification,
    refresh: fetchNotifications,
  };
};
