// components/NotificationTest.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNotifications } from "../hooks/useNotifications";
import NotificationService from "../services/NotificationService";

export default function NotificationTest() {
  const { unreadCount, sendTestNotification, fetchNotifications } =
    useNotifications();

  const handleTestLocalNotification = async () => {
    try {
      await sendTestNotification();
      Alert.alert("Success", "Test notification sent!");
    } catch (error) {
      Alert.alert("Error", "Failed to send test notification");
    }
  };

  const handleTestScheduledNotification = async () => {
    try {
      const futureDate = new Date(Date.now() + 10000); // 10 seconds from now
      await NotificationService.scheduleNotification(
        "Scheduled Notification",
        "This notification was scheduled 10 seconds ago!",
        futureDate
      );
      Alert.alert("Success", "Scheduled notification for 10 seconds from now!");
    } catch (error) {
      Alert.alert("Error", "Failed to schedule notification");
    }
  };

  const handleFetchFromAPI = async () => {
    try {
      await fetchNotifications();
      Alert.alert("Success", "Fetched notifications from API!");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to fetch from API - check your endpoint URL"
      );
    }
  };

  const handleGetToken = async () => {
    try {
      const token =
        await NotificationService.registerForPushNotificationsAsync();
      Alert.alert("Push Token", `Token: ${token?.substring(0, 50)}...`);
    } catch (error) {
      Alert.alert("Error", "Failed to get push token");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Test Panel</Text>
      <Text style={styles.unreadText}>Unread Count: {unreadCount}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleTestLocalNotification}
      >
        <Text style={styles.buttonText}>Send Test Local Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleTestScheduledNotification}
      >
        <Text style={styles.buttonText}>Schedule Notification (10s)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleFetchFromAPI}>
        <Text style={styles.buttonText}>Fetch from API</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGetToken}>
        <Text style={styles.buttonText}>Get Push Token</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  unreadText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
