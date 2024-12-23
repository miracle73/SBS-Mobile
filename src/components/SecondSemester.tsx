import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import ConfirmModal from './modals/ConfirmModal';
import Toast from 'react-native-toast-message';

interface SecondSemesterProps {
    setTotalCGPA: (value: number) => void;
    totalCGPA: number
}

const SecondSemester: React.FC<SecondSemesterProps> = ({ setTotalCGPA, totalCGPA }) => {
  
    const [modal, setModal] = useState(false);
    const initialCourses = Array.from({ length: 7 }, () => ({ course: '', unit: '', grade: '' }));
    const [courses, setCourses] = useState(initialCourses);

    const handleCourseChange = (index: number, field: 'course' | 'unit' | 'grade', value: string) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    const gradeItems = [
       
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
    ];
     const calculateCGPA = () => {
            let totalUnits = 0;
            let totalPoints = 0;
    
            courses.forEach(course => {
                if (course.unit && course.grade) {
                    const unit = parseFloat(course.unit);
                    const grade = course.grade;
    
                    let gradePoint = 0;
                    switch (grade) {
                        case 'A': gradePoint = 5; break;
                        case 'B': gradePoint = 4; break;
                        case 'C': gradePoint = 3; break;
                        case 'D': gradePoint = 2; break;
                        case 'E': gradePoint = 1; break;
                        default: gradePoint = 0; break;
                    }
    
                    totalUnits += unit;
                    totalPoints += unit * gradePoint;
                }
            });
    
            const calculatedCGPA = totalPoints / totalUnits;
            if (isNaN(calculatedCGPA)) {
                return 0;
            }
            if (totalCGPA != 0) {
                const newCGPA = (totalCGPA + calculatedCGPA) / 2;
                return newCGPA;
            }
            return calculatedCGPA
        };
    useEffect(() => {
       
    
        calculateCGPA();
    }, [courses, totalCGPA, setTotalCGPA]);
    // const calculateCGPA = () => {
    //     let totalPoints = 0;
    //     let totalUnits = 0;

    //     courses.forEach(course => {
    //         if (course.unit && course.grade) {
    //             const unit = parseFloat(course.unit);
    //             const grade = course.grade;

    //             let gradePoint = 0;
    //             switch (grade) {
    //                 case 'A': gradePoint = 5; break;
    //                 case 'B': gradePoint = 4; break;
    //                 case 'C': gradePoint = 3; break;
    //                 case 'D': gradePoint = 2; break;
    //                 case 'E': gradePoint = 1; break;
    //                 default: gradePoint = 0; break;
    //             }

    //             totalPoints += gradePoint * unit;
    //             totalUnits += unit;
    //         }
    //     });

    //     return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0';
    // };

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

        const calculatedCgpa = calculateCGPA();
        setTotalCGPA(calculatedCgpa);
        // Clear all courses 
        setCourses(initialCourses);
        setModal(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {courses.map((item, index) => (
                <View key={index} style={styles.courseContainer}>
                    <View style={{ width: '30%', alignItems: 'flex-start' }}>
                        <Text style={styles.sixthText}>Course</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder='GST 101'
                            onChangeText={text => handleCourseChange(index, 'course', text)}
                            value={item.course}
                        />
                    </View>

                    <View style={{ width: '30%', alignItems: 'flex-start' }}>
                        <Text style={styles.sixthText}>Unit</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder='1'
                            onChangeText={text => handleCourseChange(index, 'unit', text)}
                            value={item.unit}
                        />
                    </View>

                    <View style={{ width: '30%', alignItems: 'flex-start' }}>
                        <Text style={styles.sixthText}>Grade</Text>
                        <View style={styles.secondInnerContainer}>
                            <RNPickerSelect
                                onValueChange={value => handleCourseChange(index, 'grade', value)}
                                items={gradeItems}
                                placeholder={{ label: 'A', value: 'A' }}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                                value={item.grade}
                                Icon={() => (
                                    <MaterialIcons
                                        name='keyboard-arrow-down'
                                        size={24}
                                        color='#B0BEC5'
                                        style={{ alignSelf: 'center' }}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save CGPA</Text>
            </TouchableOpacity>
            {modal && <ConfirmModal modal={modal} setModal={setModal} />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        // padding: 20,
    },

    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 35

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
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
        height: 40,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        flexShrink: 0,
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
        paddingRight: 30,
        alignSelf: 'stretch',
        height: 40,
        width: '100%',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        height: 40,
        width: '100%',
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

export default SecondSemester;
