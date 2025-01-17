import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import ConfirmModal from './modals/ConfirmModal';

interface SecondSemesterProps {
  setTotalCGPA: (value: number) => void;
  totalCGPA: number;
}

const SecondSemester: React.FC<SecondSemesterProps> = ({ setTotalCGPA, totalCGPA }) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const initialCourses = Array.from({ length: 7 }, () => ({ course: '', unit: '', grade: '' }));
  const [courses, setCourses] = useState(initialCourses);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleCourseChange = (index: number, field: 'course' | 'unit' | 'grade', value: string) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const gradeItems = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
  ];

  const handleSubmit = () => {
    const isCourseFilled = courses.some(course => course.course && course.unit && course.grade);
    if (!isCourseFilled) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill at least one course',
      });
      return;
    }
    setModal(true);
  };

  return (
    <>
      <View style={styles.scrollView}>
        <FlatList
          data={courses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.courseContainer}>
              <View style={{ width: '30%', alignItems: 'flex-start' }}>
                <Text style={[styles.sixthText, { marginTop: 20 }]}>Course</Text>
                <TextInput
                  style={styles.secondInnerContainer}
                  placeholderTextColor="#98A2B3"
                  placeholder="GST 101"
                  onChangeText={text => handleCourseChange(index, 'course', text)}
                  value={item.course}
                />
              </View>
              <View style={{ width: '30%', alignItems: 'flex-start' }}>
                <Text style={[styles.sixthText, { marginTop: 20 }]}>Unit</Text>
                <TextInput
                  style={styles.secondInnerContainer}
                  placeholderTextColor="#98A2B3"
                  placeholder="1"
                  onChangeText={text => handleCourseChange(index, 'unit', text)}
                  value={item.unit}
                />
              </View>
              <View style={[{ width: '33%', alignItems: 'flex-start' }, (open && currentIndex !== index) && { zIndex: -20 }]}>
                <Text style={styles.sixthText}>Grade</Text>
                <DropDownPicker
                  open={open && currentIndex === index}
                  value={courses[index].grade}
                  items={gradeItems}
                  setOpen={(open) => {
                    setOpen(open);
                    if (open) {
                      setCurrentIndex(index);
                    } else {
                      setCurrentIndex(-1);
                    }
                  }}
                  setValue={(callback) => handleCourseChange(index, 'grade', callback())}
                  placeholder={"Grade"}
                  style={pickerSelectStyles.inputIOS}
                  dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                />
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save CGPA</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {modal && <ConfirmModal modal={modal} setModal={setModal} courses={courses} setTotalCGPA={setTotalCGPA} initialCourses={initialCourses} totalCGPA={totalCGPA} setCourses={setCourses} />}
    </>
  );
};


const styles = StyleSheet.create({
    scrollView: {
  
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 35,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    courseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sixthText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
    },
    secondInnerContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        flexShrink: 0,
        padding: 2,
        flexGrow: 0,
        color: '#000000',
        width: '100%',
        backgroundColor: '#FFFFFF',
        
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        color: '#000000',
        paddingRight: 5,
        alignSelf: 'stretch',
        height: 30,
        width: '100%',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        height: 30,
        width: '100%',
        color: '#000000',
        paddingRight: 5,
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

export default SecondSemester;
