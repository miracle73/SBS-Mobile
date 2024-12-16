import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import NotificationComponent from '../../../../components/NotificationComponent';
import NotificationImage from "../../../../../assets/images/NotificationImage.png";

const notification = () => {
  // Array of notifications
  const notifications = [
    {
      id: '1',
      title: 'New Revision Materials Available',
      content: 'Your pin is #576847. Use this to activate your account right now.',
      time: '1m ago',
    },
    {
      id: '2',
      title: 'Subscription Reminder',
      content: 'Your subscription pin is #123456. Please renew to continue enjoying premium features.',
      time: '10m ago',
    },
    {
      id: '3',
      title: 'Welcome to SBS App',
      content: 'Activate your account using pin #987654 to explore all features!',
      time: '2h ago',
    },
  ];

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationComponent
              title={item.title}
              content={item.content}
              time={item.time}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 30 }}
        />
      ) : (
        <View style={styles.noNotificationsContainer}>
          <Image source={NotificationImage} style={styles.image} />
          <Text style={styles.noNotificationsText}>
            You’re all caught up! No new notifications.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  noNotificationsContainer: {
    flex: 1,
    marginTop: 150,
    alignItems: 'center',
  },
  image: {
    width: 150, 
    height: 150,
    resizeMode: 'contain',
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'center',
    width: "50%"
  },
});

export default notification;
