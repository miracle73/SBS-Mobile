// screens/NotificationScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  SafeAreaView,
  ListRenderItem,
} from "react-native";
import { useNotifications } from "../hooks/useNotifications";
import {
  ProcessedNotification,
  NotificationScreenProps,
} from "../types/notification";

const NotificationScreen: React.FC<NotificationScreenProps> = ({
  navigation,
}) => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    refresh,
  } = useNotifications();

  const handleNotificationPress = async (
    notification: ProcessedNotification
  ): Promise<void> => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    // Handle navigation based on notification data
    // You can customize this based on your app's navigation structure
    console.log("Notification pressed:", notification);
  };

  const handleMarkAllAsRead = (): void => {
    if (unreadCount > 0) {
      Alert.alert(
        "Mark All as Read",
        `Mark all ${unreadCount} notifications as read?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: markAllAsRead },
        ]
      );
    }
  };

  const handleClearAll = (): void => {
    if (notifications.length > 0) {
      Alert.alert(
        "Clear All Notifications",
        "Are you sure you want to delete all notifications?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: clearAllNotifications,
          },
        ]
      );
    }
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    }
  };

  const renderNotificationItem: ListRenderItem<ProcessedNotification> = ({
    item,
  }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.timestamp}>{formatDate(item.createdAt)}</Text>
        </View>
        <Text style={[styles.message, !item.isRead && styles.unreadMessage]}>
          {item.message}
        </Text>
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = (): JSX.Element => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No notifications yet</Text>
      <Text style={styles.emptyStateSubtext}>
        You'll see notifications here when they arrive
      </Text>
    </View>
  );

  const renderHeader = (): JSX.Element => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <View style={styles.headerActions}>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.headerButtonText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
        {notifications.length > 0 && (
          <TouchableOpacity
            style={[styles.headerButton, styles.clearButton]}
            onPress={handleClearAll}
          >
            <Text style={[styles.headerButtonText, styles.clearButtonText]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading notifications</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList<ProcessedNotification>
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item: ProcessedNotification) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={["#007AFF"]}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#007AFF",
  },
  clearButton: {
    backgroundColor: "#dc3545",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  clearButtonText: {
    color: "#fff",
  },
  listContainer: {
    flexGrow: 1,
  },
  notificationItem: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: "#f8f9ff",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  notificationContent: {
    position: "relative",
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    color: "#212529",
    fontWeight: "700",
  },
  timestamp: {
    fontSize: 12,
    color: "#6c757d",
  },
  message: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
  },
  unreadMessage: {
    color: "#495057",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NotificationScreen;
