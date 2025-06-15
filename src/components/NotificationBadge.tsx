// components/NotificationBadge.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useNotifications } from "../hooks/useNotifications";
import {
  NotificationBadgeProps,
  NotificationBadgeWithIconProps,
} from "../types/notification";

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  onPress,
  size = 24,
  color = "#007AFF",
  backgroundColor = "#fff",
  textColor = "#fff",
  showZero = false,
  style = {},
}) => {
  const { unreadCount } = useNotifications();

  if (!showZero && unreadCount === 0) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <NotificationIcon size={size} color={color} />
      </TouchableOpacity>
    );
  }

  const displayCount = unreadCount > 99 ? "99+" : unreadCount.toString();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <NotificationIcon size={size} color={color} />
      {unreadCount > 0 && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={[styles.badgeText, { color: textColor }]}>
            {displayCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Simple notification bell icon component
interface NotificationIconProps {
  size: number;
  color: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ size, color }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Simple bell icon using View components */}
      <View
        style={[
          styles.bellIcon,
          {
            width: size * 0.8,
            height: size * 0.8,
            borderColor: color,
          },
        ]}
      />
      <View
        style={[
          styles.bellClapper,
          {
            backgroundColor: color,
            width: size * 0.15,
            height: size * 0.15,
          },
        ]}
      />
    </View>
  );
};

// Alternative component using Expo Vector Icons (if you have it installed)
export const NotificationBadgeWithIcon: React.FC<
  NotificationBadgeWithIconProps
> = ({
  onPress,
  IconComponent,
  iconName = "bell",
  iconSize = 24,
  iconColor = "#007AFF",
  badgeColor = "#ff4444",
  textColor = "#fff",
  showZero = false,
  style = {},
  // }) => {
  //   const { un
}) => {
  const { unreadCount } = useNotifications();

  const displayCount = unreadCount > 99 ? "99+" : unreadCount.toString();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {IconComponent && (
        <IconComponent name={iconName} size={iconSize} color={iconColor} />
      )}
      {(unreadCount > 0 || showZero) && (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={[styles.badgeText, { color: textColor }]}>
            {displayCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 4,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bellIcon: {
    borderWidth: 2,
    borderRadius: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bellClapper: {
    position: "absolute",
    bottom: 2,
    borderRadius: 2,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default NotificationBadge;
