import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

const edu = () => {
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const schoolItems = [
    { label: 'School of Engineering', value: 'engineering' },
    { label: 'School of Medicine', value: 'medicine' },
    { label: 'School of Law', value: 'law' },
    { label: 'School of Business', value: 'business' },
    { label: 'School of Arts', value: 'arts' },
  ];

  // Define Subject Categories (example)
  const subjectItems = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Medicine', value: 'medicine' },
    { label: 'Law', value: 'law' },
    { label: 'Business', value: 'business' },
    { label: 'Arts & Humanities', value: 'arts_humanities' },
  ];

  // Define Topics (sub-categories of each subject)
  const topicItems = [

    { label: 'Computer Science', value: 'cs' },
    { label: 'Mechanical Engineering', value: 'mech_eng' },
    { label: 'Electrical Engineering', value: 'elec_eng' },
    { label: 'Civil Engineering', value: 'civil_eng' },

    { label: 'General Medicine', value: 'general_medicine' },
    { label: 'Surgery', value: 'surgery' },
    { label: 'Pharmacology', value: 'pharmacology' },
    { label: 'Pediatrics', value: 'pediatrics' },

    { label: 'Criminal Law', value: 'criminal_law' },
    { label: 'Corporate Law', value: 'corporate_law' },
    { label: 'International Law', value: 'intl_law' },
    { label: 'Family Law', value: 'family_law' },

    { label: 'Accounting', value: 'accounting' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Management', value: 'management' },
    { label: 'Finance', value: 'finance' },


    { label: 'Philosophy', value: 'philosophy' },
    { label: 'History', value: 'history' },
    { label: 'Literature', value: 'literature' },
    { label: 'Psychology', value: 'psychology' },

  ];

  // Define Levels of Study
  const levelItems = [
    { label: 'Undergraduate', value: 'undergraduate' },
    { label: 'Postgraduate', value: 'postgraduate' },
    { label: 'Doctorate', value: 'doctorate' },
  ];

  // Define Years (could be specific to subject or level)
  const yearItems = [
    { label: 'Year 1', value: 'year_1' },
    { label: 'Year 2', value: 'year_2' },
    { label: 'Year 3', value: 'year_3' },
    { label: 'Year 4', value: 'year_4' },
    { label: 'Year 5', value: 'year_5' },

  ];

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>
        Past Questions
        </Text>
        <Text style={styles.secondText}>
          Select a course and topic you wish to study
        </Text>

        {/* School Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>School</Text>
          <RNPickerSelect
            onValueChange={(value) => setSchool(value)}
            items={schoolItems}
            placeholder={{ label: 'Choose Your school', value: null }}
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

        {/* Subject Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Subject</Text>
          <RNPickerSelect
            onValueChange={(value) => setCourse(value)}
            items={subjectItems}
            placeholder={{ label: 'Select Subject', value: null }}
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

        {/* Topic Picker */}

        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Topic</Text>
          <RNPickerSelect
            onValueChange={(value) => setTopic(value)}
            items={topicItems}
            placeholder={{ label: 'Select Topic', value: null }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            value={topic}
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
            placeholder={{ label: 'Choose Level', value: null }}
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

        {/* Year Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>Year</Text>
          <RNPickerSelect
            onValueChange={(value) => setYear(value)}
            items={yearItems}
            placeholder={{ label: 'Select Year', value: null }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            value={year}
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
          <Text style={styles.buttonText}>Load Questions</Text>
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
  fourthText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 5,
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
    marginTop: 30

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

export default edu;
