import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// Props for dynamic content
interface NotificationComponentProps {
  title: string;
  content: string;
  time: string;
}

const NotificationComponent = ({ title, content, time }: NotificationComponentProps) => {
  // Identify the pin in the content using a regular expression
  const pinRegex = /#\d+/g;
  const contentParts = content.split(pinRegex); // Split content by pin
  const pins = content.match(pinRegex); // Extract all pins

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.firstText}>{title}</Text>
      <View style={styles.Container}>
        <Text style={styles.secondText}>
          {contentParts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {/* Add the pin with different styling */}
              {pins && pins[index] && <Text style={styles.pin}>{pins[index]}</Text>}
            </React.Fragment>
          ))}
        </Text>
        <Text style={styles.thirdText}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  firstText: {
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    color: '#003F91',
  },
  secondText: {
    fontSize: 10,
    fontWeight: '400', 
    fontStyle: 'normal',
    color: '#000000',
    width: '80%',
  },
  pin: {
    fontWeight: '700', 
    color: '#000000',
  },
  thirdText: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#6C6C6C',
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 5
  },
});

export default NotificationComponent;
