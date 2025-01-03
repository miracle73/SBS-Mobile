import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import FirstImage from "../../../../../assets/images/Dropdown.png"
import CourseCard from '../../../../components/CourseCard';
import { useRouter } from 'expo-router';
import { useViewAllCoursesQuery } from '../../../../components/services/adminService';
import { RootState } from '../../../../components/redux/store';
import { useSelector } from 'react-redux';

const Course5 = () => {
    const router = useRouter();
    const secret = useSelector((state: RootState) => state.admin.admin.secret);
    console.log(secret);
    const { data, error, isLoading } = useViewAllCoursesQuery({ secret });

   
    if (isLoading) {
        return (
            <SafeAreaView style={styles.bodyContainer}>
                <ActivityIndicator size="large" color="#FF8C00" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, justifyContent: "space-between" }} showsVerticalScrollIndicator={false}>

                <Text style={styles.fourthText}>
                    Courses
                </Text>

                {Array.isArray(data) && data.length > 0 &&
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.secondText}>
                            View all uploaded courses
                        </Text>
                    </View>
                }


                <View style={styles.layout}>
                    {error && <Text>Error loading courses</Text>}
                    {Array.isArray(data) && data.length > 0 ? (
                        (data ?? []).map((course: any, index: any) => (
                            <View key={index} style={{ width: '47%', marginBottom: 20 }}>
                                <CourseCard course={course} />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.secondText}>No courses available</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={() => { router.push("/admin/adminhome/upload/course2") }}>
                    <Text style={styles.buttonText}>Add course</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    lineContainer: {
        backgroundColor: "#E6EBF6",
        height: 9,
        borderRadius: 20,
        marginVertical: 20
    },
    innerLineContainer: {
        backgroundColor: "#0337A4",
        height: 9,
        borderRadius: 20,
        width: "100%"
    },

    bodyContainer: {
        paddingTop: 20,
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
        color: '#6D6D6D',
        fontWeight: '400',
    },
    thirdText: {
        fontSize: 14,
        color: '#101928',
        fontWeight: '500',
        marginBottom: 5,
    },
    fourthText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '700',

    },
    sixthText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '400',
    },
    seventhText: {
        fontSize: 16,
        color: '#1D1B20',
        fontWeight: '700',
    },

    pickerContainer: {
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        gap: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 50,
        marginBottom: 20

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },
    secondContainer: {
        height: 60,
        marginTop: 15,
        padding: 10,
        backgroundColor: "#FEF7FF"

    },
    layout: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }
});


export default Course5;
