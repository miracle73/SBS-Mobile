import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker';
import { useGetSchoolLevelsCoursesQuery, useSearchTopicsInCoursesMutation } from '../../components/services/userService';
import * as Device from 'expo-device';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const edu = () => {
  const [loading, setLoading] = useState(false)
  const [school, setSchool] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [level, setLevel] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const router = useRouter();
  const [schoolItems, setSchoolItems] = useState<{ label: string; value: string }[]>([]);
  const [levelItems, setLevelItems] = useState<{ label: string; value: string }[]>([]);
  const [courseItems, setCourseItems] = useState<{ label: string; value: string }[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  // 
  const { data, isSuccess, isLoading } = useGetSchoolLevelsCoursesQuery({ phone_imei: Device.osBuildId});
  const [searchTopicsInCourses] = useSearchTopicsInCoursesMutation();

 

  useEffect(() => {
    const fetchStoredContents = async () => {
      const netInfo = await NetInfo.fetch();
      setIsConnected(netInfo.isConnected ?? false);
      if (netInfo.isConnected && isSuccess && data) {
        const formattedSchools = {
          label: data.name,
          value: data.id.toString(),
        };
        setSchoolItems([formattedSchools]);

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
      } else {
        // Offline mode: fetch data from the Redux store or AsyncStorage
        const storedContents = await AsyncStorage.getItem('userContents');
        if (storedContents) {
          setIsConnected(false);
          console.log(isConnected)
          const parsedContents = JSON.parse(storedContents);

          const uniqueLevels = Array.from(new Set(parsedContents.map((content: any) => content.course_level)));
          const uniqueCourses = Array.from(new Set(parsedContents.map((content: any) => content.course_name)));

          const offlineLevels = uniqueLevels.map((level: any) => ({
            label: level,
            value: level,
          }));
          setLevelItems(offlineLevels);

          const offlineCourses = uniqueCourses.map((course: any) => ({
            label: course,
            value: course,
          }));
          setCourseItems(offlineCourses);
        }
      }
    };
    fetchStoredContents();
  }, [data, isSuccess]);



  // Define Years (could be specific to subject or level)
  const yearItems = [
    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },

  ];



  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await searchTopicsInCourses({
  //       course_id: parseInt(course),
  //       level_id: parseInt(level),
  //       school_id: parseInt(school),
  //     }).unwrap();

  //     if (result.status === 'successful') {

  //       router.push({
  //         pathname: '/other/pastQuestionTopic',
  //         params: { topics: JSON.stringify(result.topics), year: JSON.stringify(year) },
  //       });
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: 'Failed to fetch topics. Please try again.',
  //       });
  //       return;
  //     }
  //   } catch (error) {

  //     const errorMessage = (error as any)?.data?.detail[0]?.msg ||
  //       (error as any)?.data?.detail ||
  //       (error as any)?.data?.message ||
  //       'An error occurred. Please try again.';
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: 'An error occurred. Please try again.',
  //     });
  //     return;
  //   } finally {
  //     setSchool("");
  //     setLevel("");
  //     setCourse("");
  //     setYear("");
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        console.log(level)
        const result = await searchTopicsInCourses({
          course_id: parseInt(course),
          level_id: parseInt(level),
          school_id: parseInt(school),
        }).unwrap();

        if (result.status === 'successful') {
          router.push({
            pathname: '/other/pastQuestionTopic',
            params: { topics: JSON.stringify(result.topics), year: JSON.stringify(year), level: JSON.stringify(level), },
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to fetch topics. Please try again.',
          });
          return;
        }
      } else {
      // Offline mode: fetch data from the Redux store
      const storedContents = await AsyncStorage.getItem('userContents');
      if (storedContents) {
        console.log(1)
        const parsedContents = JSON.parse(storedContents);

        const selectedCourse = parsedContents.find(
          (content: any) =>
            content.course_level == level &&
            content.course_name == course &&
            content.topics.length > 0
        );


        console.log(2, selectedCourse)
        if (selectedCourse) {
          const offlineTopics = selectedCourse.topics.map((topic: any, index: any) => ({
            id: index + 1,
            title: topic.topic_title,
            free: topic.topic_free,
            courseName: course,
          }));
          console.log(3)
          router.push({
            pathname: '/other/pastQuestionTopic',
            params: { topics: JSON.stringify(offlineTopics), year: JSON.stringify(year),  level: JSON.stringify(level) },
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No offline data available for selected course. Please try again.',
          });
        }

        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again.',
      });
    } finally {
      setSchool("");
      setLevel("");
      setCourse("");
      setYear("")
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.fourthText}>
          Past Questions
        </Text>
        <Text style={styles.secondText}>
          Select a course and topic you wish to study
        </Text>
        {isConnected &&
          <View style={styles.pickerContainer}>
            <Text style={styles.thirdText}>School</Text>
            <DropDownPicker
              open={open}
              value={school}
              items={schoolItems}
              setItems={setSchoolItems}
              closeAfterSelecting={true}
              closeOnBackPressed={true}
              listItemContainerStyle={{
                height: 40
              }}
              setOpen={setOpen}
              setValue={setSchool}
              placeholder="Choose Your School"
              style={pickerSelectStyles.inputIOS}
              dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
            />

          </View>
        }
        {/* School Picker */}

        {/* Subject Picker */}
        <View style={[styles.pickerContainer, open && { zIndex: -20 }]}>
          <Text style={styles.thirdText}>Subject</Text>
          <DropDownPicker
            open={open2}
            value={course}
            items={courseItems}
            setItems={setCourseItems}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40
            }}
            setOpen={setOpen2}
            setValue={setCourse}
            placeholder="Select Subject"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />

        </View>


        {/* Year Picker */}
        <View style={[styles.pickerContainer, (open2 || open) && { zIndex: -20 }]}>
          <Text style={styles.thirdText}>Level</Text>
          <DropDownPicker
            open={open3}
            value={level}
            items={levelItems}
            setItems={setLevelItems}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40
            }}
            setOpen={setOpen3}
            setValue={setLevel}
            placeholder="Select Level"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />

        </View>

        {/* Year Picker */}
        <View style={[styles.pickerContainer, (open3 || open2 || open) && { zIndex: -20 }]}>
          <Text style={styles.thirdText}>Year</Text>
          <DropDownPicker
            open={open4}
            value={year}
            items={yearItems}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40
            }}
            setOpen={setOpen4}
            setValue={setYear}
            placeholder="Select Year"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
          />

        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="#FFFFFF" size={14} /> : <Text style={styles.buttonText}>Load Questions</Text>}

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

export default edu;
