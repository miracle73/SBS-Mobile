import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import BirthdayCard from '../../components/BirthdayCard';
import { useGetBirthdaysQuery } from '../../components/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const More = () => {
  const { data, isSuccess, isLoading } = useGetBirthdaysQuery();
  interface Birthday {
    name: string;
    image_url: string;
    note: string;
    department: string;
    level: string;
    school: string;
    dob: string;
  }
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        if (isSuccess && data) {
          await AsyncStorage.setItem('birthdays', JSON.stringify(data));
          setBirthdays(data);
        }
      } else {
        const storedData = await AsyncStorage.getItem('birthdays');
        if (storedData) {
          setBirthdays(JSON.parse(storedData));
        } else {
          Alert.alert('No Internet', 'Please go online to download the latest data.');
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [isSuccess, data]);

  if (loading) {
    return (
      <SafeAreaView style={styles.bodyContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>Birthday Celebration</Text>
        {birthdays.length > 0 ? (
          birthdays.map((birthday, index) => (
            // <BirthdayCard key={index} birthday={birthday} />
            <View key={index} style={{ width: '47%', marginBottom: 20 }}>
            <BirthdayCard
              name={birthday.name}
              image={birthday.image_url}
              note={birthday.note}
              department={birthday.department}
              level={birthday.level}
              school={birthday.school}
              dob={birthday.dob}
            />
          </View>
          ))
        ) : (
          <Text style={styles.noBirthdaysText}>No Birthdays Today</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fourthText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 5,
  },
  noBirthdaysText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    marginTop: 20,
  },
});

export default More;