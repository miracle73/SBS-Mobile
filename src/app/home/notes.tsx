import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity  } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

const notes = () => {
  const [institution, setInstitution] = useState("");
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const router = useRouter()

  const institutionItems = [
    { label: 'Harvard University', value: 'harvard' },
    { label: 'Stanford University', value: 'stanford' },
    { label: 'MIT', value: 'mit' },
    { label: 'University of Oxford', value: 'oxford' },
    { label: 'University of Cambridge', value: 'cambridge' },
  ];

  const schoolItems = [
    { label: 'School of Engineering', value: 'engineering' },
    { label: 'School of Medicine', value: 'medicine' },
    { label: 'School of Law', value: 'law' },
    { label: 'School of Business', value: 'business' },
    { label: 'School of Arts', value: 'arts' },
  ];

  const levelItems = [
    { label: 'Undergraduate', value: 'undergraduate' },
    { label: 'Postgraduate', value: 'postgraduate' },
    { label: 'Doctorate', value: 'doctorate' },
  ];

  const courseItems = [
    { label: 'Computer Science', value: 'cs' },
    { label: 'Mechanical Engineering', value: 'mech_eng' },
    { label: 'Economics', value: 'economics' },
    { label: 'Psychology', value: 'psychology' },
    { label: 'Physics', value: 'physics' },
  ];

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.firstText}>Lecture Notes</Text>
        <Text style={styles.secondText}>
          Get access to unlimited notes from your lecturers and learn easily.
        </Text>

        {/* Institution Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Institution</Text>
          <RNPickerSelect
            onValueChange={(value) => setInstitution(value)}
            items={institutionItems}
            placeholder={{ label: 'Select Institution', value: null }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            value={institution}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#B0BEC5"
                style={{ alignSelf: 'center' }}
              />
            )}
          />
        </View>

        {/* School Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>School</Text>
          <RNPickerSelect
            onValueChange={(value) => setSchool(value)}
            items={schoolItems}
            placeholder={{ label: 'Select School', value: null }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            value={school}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#B0BEC5"
                style={{ alignSelf: 'center' }}
              />
            )}
          />
        </View>

        {/* Level Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Level</Text>
          <RNPickerSelect
            onValueChange={(value) => setLevel(value)}
            items={levelItems}
            placeholder={{ label: 'Select Level', value: null }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            value={level}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#B0BEC5"
                style={{ alignSelf: 'center' }}
              />
            )}
          />
        </View>

        {/* Course Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Course</Text>
          <RNPickerSelect
            onValueChange={(value) => setCourse(value)}
            items={courseItems}
            placeholder={{ label: 'Select Course', value: null }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            value={course}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#B0BEC5"
                style={{ alignSelf: 'center' }}
              />
            )}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { router.push(`/other/search`) }}>
            <Text style={styles.buttonText}>Search Note</Text>
          </TouchableOpacity>
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
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 5,
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
  pickerContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FF8C00",
    paddingVertical: 15,
    marginTop: 20

  }
  ,
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF"
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    color: '#000000',
    paddingRight: 30,
    alignSelf: 'stretch',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    color: '#000000',
    paddingRight: 30,
    alignSelf: 'stretch',
  },
  iconContainer: {
    top: '50%',
    right: 10,
    transform: [{ translateY: -12 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default notes;
