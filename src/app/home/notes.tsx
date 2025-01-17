import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Device from 'expo-device';
import Toast from 'react-native-toast-message';
import { useGetSchoolLevelsCoursesQuery, useSearchTopicsInCoursesMutation } from '../../components/services/userService';
import DropDownPicker from 'react-native-dropdown-picker';

const Notes = () => {
  const [institution, setInstitution] = useState("");
  const [school, setSchool] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [schoolItems, setSchoolItems] = useState<{ label: string; value: string }[]>([]);
  const [levelItems, setLevelItems] = useState<{ label: string; value: string }[]>([]);
  const [courseItems, setCourseItems] = useState<{ label: string; value: string }[]>([]);
  const router = useRouter();

  const { data, isSuccess, isLoading } = useGetSchoolLevelsCoursesQuery({ phone_imei: Device.osBuildId });
  const [searchTopicsInCourses] = useSearchTopicsInCoursesMutation();

  console.log(data, 56, schoolItems)


  useEffect(() => {
    if (isSuccess && data) {
      const formattedSchools = {
        label: data.name,
        value: data.id.toString(),
      };
      setSchoolItems([formattedSchools]);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSuccess && data) {


      const formattedLevels = data.levels.map((level) => ({
        label: level.name,
        value: level.id,
      }));
      setLevelItems(formattedLevels);

      const formattedCourses = data.courses.map((course) => ({
        label: course.name,
        value: course.id,
      }));
      setCourseItems(formattedCourses);

    }
  }, [school, data]);


  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(level)
      const result = await searchTopicsInCourses({
       
        course_id: parseInt(course),
        level_id: parseInt(level),
        school_id: parseInt(school),
      }).unwrap();

      if (result.status === 'successful') {
        router.push({
          pathname: '/other/topics',
          params: { topics: JSON.stringify(result.topics) },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch topics. Please try again.',
        });
        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again.',
      });
      
      return;
    } finally {
      setSchool("");
      setLevel("");
      setCourse("");
      setLoading(false);
    }
  };

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
        <Text style={styles.firstText}>Lecture Notes</Text>
        <Text style={styles.secondText}>
          Get access to unlimited notes from your lecturers and learn easily.
        </Text>


        {/* School Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.thirdText}>School</Text>
          <DropDownPicker
            open={open}
            value={school}
            items={schoolItems}
            setOpen={setOpen}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40
            }}
            setValue={setSchool}
            setItems={setSchoolItems}
            placeholder="Select School"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />
          {/* <RNPickerSelect
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
          /> */}
        </View>

        {/* Level Picker */}
        <View style={[styles.pickerContainer, open && { zIndex: -20 }]}>

          <Text style={styles.thirdText}>Level</Text>
          <DropDownPicker
            open={open2}
            value={level}
            items={levelItems}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40
            }}
            setOpen={setOpen2}
            setValue={setLevel}
            setItems={setLevelItems}
            placeholder="Select Level"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />

          {/* <RNPickerSelect
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
          /> */}
        </View>

        {/* Course Picker */}
        <View style={[styles.pickerContainer, (open2 || open) && { zIndex: -20 }]}>

          <Text style={styles.thirdText}>Course</Text>
          <DropDownPicker
            open={open3}
            value={course}
            items={courseItems}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40
            }}
            setOpen={setOpen3}
            setValue={setCourse}
            setItems={setCourseItems}
            placeholder="Select Course"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />

          {/* <RNPickerSelect
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
          /> */}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Search Note</Text>}

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
  },
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
  dropDownContainer: {
    borderColor: '#B0BEC5',
  },
  iconContainer: {
    top: '50%',
    right: 10,
    transform: [{ translateY: -12 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notes;
