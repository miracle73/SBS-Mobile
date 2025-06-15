// types/notification.ts
// export interface NotificationData {
//   title: string;
//   message: string;
//   created_at: string;
// }

// API Response interfaces
export interface TodayNotificationItem {
  title: string;
  message: string;
  created_at: string;
}

export interface TodayNotificationResponse {
  detail?: string; // When no notifications
}

// Union type for the API response
export type GetTodayNotificationsResponse =
  | TodayNotificationItem[]
  | TodayNotificationResponse;

export interface ProcessedNotification {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface NotificationServiceInterface {
  token: string | null;
  registerForPushNotificationsAsync(): Promise<string | undefined>;
  setupNotificationListeners(): void;
  fetchNotifications(): Promise<ProcessedNotification[]>;
  sendLocalNotification(
    title: string,
    message: string,
    data?: Record<string, any>
  ): Promise<void>;
  scheduleNotification(
    title: string,
    message: string,
    triggerDate: Date,
    data?: Record<string, any>
  ): Promise<void>;
  cancelAllNotifications(): Promise<void>;
  removeListeners(): void;
  getStoredNotifications(): Promise<ProcessedNotification[]>;
  storeNotifications(notifications: ProcessedNotification[]): Promise<void>;
  markAsRead(notificationId: string): Promise<ProcessedNotification[]>;
  getUnreadCount(): Promise<number>;
}

export interface UseNotificationsReturn {
  notifications: ProcessedNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  sendTestNotification: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface NotificationBadgeProps {
  onPress?: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  showZero?: boolean;
  style?: any;
}

export interface NotificationBadgeWithIconProps {
  onPress?: () => void;
  IconComponent?: any;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  badgeColor?: string;
  textColor?: string;
  showZero?: boolean;
  style?: any;
}

export interface NotificationScreenProps {
  navigation: any; // You can replace with proper navigation type from @react-navigation/native
}
