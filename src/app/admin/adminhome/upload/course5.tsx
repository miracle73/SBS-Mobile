import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React from 'react';
import FirstImage from "../../../../../assets/images/Dropdown.png"
import CourseCard from '../../../../components/CourseCard';
import { useRouter } from 'expo-router';
const course5 = () => {
const router = useRouter()


    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
             
                <Text style={styles.fourthText}>
                    Courses
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.secondText}>
                        View all uploaded courses
                    </Text>

                </View>

                <View style={styles.layout}>
                    <View style={{ width: "47%" }}>
                        <CourseCard />
                        <CourseCard />
                    </View>
                    <View style={{ width: "47%" }}>
                        <CourseCard />
                        <CourseCard />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {router.push("/admin/adminhome/upload/course2")}}>

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


export default course5;
