import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import BirthdayCard from '../../components/BirthdayCard';
import { useGetBirthdaysQuery } from '../../components/services/userService';

const More = () => {
  const { data, isSuccess, isLoading } = useGetBirthdaysQuery();
  console.log(data, 56)
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
