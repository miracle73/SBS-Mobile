import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import {
  useGetSchoolLevelsCoursesQuery,
  useSearchTopicsInCoursesMutation,
  useGetTopicsByLevelMutation,
} from "../../components/services/userService";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux";
import { RootState } from "../../components/redux/store";

const Notes = () => {
  const [school, setSchool] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState("");
  const [schoolItems, setSchoolItems] = useState<
    { label: string; value: string }[]
  >([]);
  const [levelItems, setLevelItems] = useState<
    { label: string; value: string }[]
  >([]);
  const [courseItems, setCourseItems] = useState<
    { label: string; value: string }[]
  >([]);
  const router = useRouter();
  const userContents = useSelector(
    (state: RootState) => state.userContent.contents
  );
  const [getTopicsByLevel] = useGetTopicsByLevelMutation();
  const { data, isSuccess, isLoading, isError } = useGetSchoolLevelsCoursesQuery({
    phone_imei: uuid,
  }, {
    skip: !uuid, // Don't fire query until UUID is loaded
  });
  const [searchTopicsInCourses] = useSearchTopicsInCoursesMutation();
  const [isConnected, setIsConnected] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchStoredUuid = async () => {
      try {
        let storedUuid = await AsyncStorage.getItem("device_uuid");
        if (storedUuid) {
          setUuid(storedUuid);
        }
        setInitialLoading(false);
      } catch (error) {
        console.error("Error fetching UUID:", error);
        setInitialLoading(false);
      }
    };
    fetchStoredUuid();
  }, []);

  // Load levels - online or offline
  useEffect(() => {
    const fetchStoredContents = async () => {
      const netInfo = await NetInfo.fetch();
      const connected = netInfo.isConnected ?? false;
      setIsConnected(connected);

      if (connected && isSuccess && data) {
        // ONLINE: use API data
        const formattedSchools = {
          label: data.name,
          value: data.id.toString(),
        };
        setSchoolItems([formattedSchools]);

        const formattedLevels = data.levels.map((level: any) => ({
          label: level.name,
          value: level.id.toString(),
        }));
        setLevelItems(formattedLevels);
      } else if (!connected || isError) {
        // OFFLINE or API failed: load from AsyncStorage
        const storedContents = await AsyncStorage.getItem("userContents");
        if (storedContents) {
          setIsConnected(false);
          const parsedContents = JSON.parse(storedContents);

          const uniqueLevels = Array.from(
            new Set(parsedContents.map((content: any) => content.course_level))
          );

          // For offline: value = label (the actual level string like "100")
          const offlineLevels = uniqueLevels.map((lvl: any) => ({
            label: lvl,
            value: lvl,
          }));
          setLevelItems(offlineLevels);
        }
      }
    };
    fetchStoredContents();
  }, [data, isSuccess, isError]);

  // When level changes, load courses
  useEffect(() => {
    if (!level) return;

    const fetchCourses = async () => {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected && isConnected) {
        // ONLINE: fetch from API
        try {
          const selectedLevel = levelItems.find(
            (item) => item.value === level
          )?.label;
          const { data: topicsByLevelData } = await getTopicsByLevel({
            phone_imei: uuid,
            level: selectedLevel ? parseInt(selectedLevel) : 0,
          });

          if (topicsByLevelData) {
            const formattedCourses = topicsByLevelData.map((course) => ({
              label: course.name,
              value: course.id.toString(),
            }));
            setCourseItems(formattedCourses);
          }
        } catch (error) {
          console.error("Error fetching topics by level:", error);
        }
      } else {
        // OFFLINE: filter courses from stored data using the level value directly
        const storedContents = await AsyncStorage.getItem("userContents");
        if (storedContents) {
          const parsedContents = JSON.parse(storedContents);

          // In offline mode, level value IS the label (e.g. "100")
          const uniqueCourses = Array.from(
            new Set(
              parsedContents
                .filter((content: any) => content.course_level === level)
                .map((content: any) => content.course_name)
            )
          );

          const offlineCourses = uniqueCourses.map((c: any) => ({
            label: c,
            value: c,
          }));
          setCourseItems(offlineCourses);
        }
      }
    };

    fetchCourses();
  }, [level, uuid, isConnected]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected && isConnected) {
        const result = await searchTopicsInCourses({
          course_id: parseInt(course),
          level_id: parseInt(level),
          school_id: parseInt(schoolItems[0].value),
        }).unwrap();

        if (result.status === "successful") {
          const selectedLevel = levelItems.find(
            (item) => item.value === level
          )?.label;
          router.push({
            pathname: "/other/topics",
            params: {
              topics: JSON.stringify(result.topics),
              level: JSON.stringify(selectedLevel),
            },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to fetch topics. Please try again.",
          });
          return;
        }
      } else {
        // OFFLINE: level value = course_level, course value = course_name
        const storedContents = await AsyncStorage.getItem("userContents");
        if (storedContents) {
          const parsedContents = JSON.parse(storedContents);

          const selectedCourse = parsedContents.find(
            (content: any) =>
              content.course_level === level &&
              content.course_name === course &&
              content.topics.length > 0
          );

          if (selectedCourse) {
            const offlineTopics = selectedCourse.topics.map(
              (topic: any, index: any) => ({
                id: index + 1,
                title: topic.topic_title,
                free: topic.topic_free,
                courseName: course,
              })
            );
            router.push({
              pathname: "/other/topics",
              params: {
                topics: JSON.stringify(offlineTopics),
                level: JSON.stringify(level),
              },
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "No offline data available for selected course.",
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "No Data",
            text2: "No offline data found. Please connect to the internet first.",
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred. Please try again.",
      });
    } finally {
      setSchool("");
      setLevel("");
      setCourse("");
      setLoading(false);
    }
  };

  if (initialLoading) {
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

        {!isConnected && (
          <View style={{ backgroundColor: '#FFF3CD', padding: 8, borderRadius: 6, marginTop: 10 }}>
            <Text style={{ fontSize: 12, color: '#856404' }}>You are offline. Showing cached data.</Text>
          </View>
        )}

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
              height: 40,
            }}
            setOpen={setOpen2}
            setValue={setLevel}
            setItems={setLevelItems}
            placeholder="Select Level"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
            zIndex={open2 ? 1000 : 1}
          />
        </View>

        {/* Course Picker */}
        <View
          style={[
            styles.pickerContainer,
            open3 ? { zIndex: 2000 } : { zIndex: 1 },
          ]}
        >
          <Text style={styles.thirdText}>Course</Text>
          <DropDownPicker
            open={open3}
            value={course}
            items={courseItems}
            closeAfterSelecting={true}
            closeOnBackPressed={true}
            listItemContainerStyle={{
              height: 40,
            }}
            setOpen={setOpen3}
            setValue={setCourse}
            setItems={setCourseItems}
            placeholder="Select Course"
            style={pickerSelectStyles.inputIOS}
            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
            zIndex={open3 ? 2000 : 1}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { zIndex: 0 }]}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Search Note</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  firstText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 5,
  },
  secondText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
  },
  thirdText: {
    fontSize: 10,
    color: "#1A1A1A",
    fontWeight: "400",
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    color: "#000000",
    paddingRight: 30,
    alignSelf: "stretch",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    color: "#000000",
    paddingRight: 30,
    alignSelf: "stretch",
  },
  dropDownContainer: {
    borderColor: "#B0BEC5",
  },
  iconContainer: {
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notes;