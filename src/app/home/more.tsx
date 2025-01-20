import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import BirthdayCard from '../../components/BirthdayCard';
import { useGetBirthdaysQuery } from '../../components/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const More = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  interface Birthday {
    name: string;
    image_url: string;
    note: string;
    department: string;
    level: string;
    school: string;
    dob: string;
  }
  
  const [birthdays, setBirthdays] = React.useState<Birthday[]>([]);
  const { data, isSuccess, isLoading } = useGetBirthdaysQuery();

  React.useEffect(() => {
    NetInfo.fetch().then(async state => {
      setIsConnected(state.isConnected ?? false);
      if (state.isConnected) {
        if (isSuccess && data) {
          await AsyncStorage.setItem('birthdays', JSON.stringify(data));
          setBirthdays(data);
        }
      } else {
        const storedBirthdays = await AsyncStorage.getItem('birthdays');
        setBirthdays(storedBirthdays ? JSON.parse(storedBirthdays) : []);
      }
    });
  }, []);

  
  React.useEffect(() => {
    if (!isConnected && !birthdays.length) {
      // Prompt user to go online
      alert('Please go online to download birthday data.');
    }
  }, [isConnected, birthdays]);
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.bodyContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>
          Birthday Celebration
        </Text>
        
        {(data ?? []).length > 0 &&
          <Text style={styles.secondText}>
            View all celebrants
          </Text>
        }


        {(data ?? []).length > 0 &&
          <Text style={styles.firstText}>Today’s Birthday Stars</Text>
        }

        <View style={styles.layout}>
          {(data ?? []).length > 0 ? (
            (data ?? []).map((celebrant, index) => (
              <View key={index} style={{ width: '47%', marginBottom: 20 }}>
                <BirthdayCard
                  name={celebrant.name}
                  image={celebrant.image_url}
                  note={celebrant.note}
                  department={celebrant.department}
                  level={celebrant.level}
                  school={celebrant.school}
                  dob={celebrant.dob}
                />
              </View>
            ))
          ) : (
            <Text style={styles.secondText}>No birthdays today</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  firstText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 30,
  },
  secondText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },
  thirdText: {
    fontSize: 10,
    color: '#1A1A1A',
    fontWeight: '400',
    marginBottom: 5,
  },
  fourthText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 5,
  },
  pickerContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Ensure the items wrap to the next line if needed
  },
});

export default More;
