import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import BirthdayCard from '../../components/BirthdayCard';
import CalculatorModal from '../../components/modals/CalculatorModal';

const level = () => {
    const [modal, setModal] = useState(false)
    const [course, setCourse] = useState("")
    const [unit, setUnit] = useState("")

    const gradeItems = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
    ];
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.fourthText}>
                    100 level
                </Text>
                <Text style={styles.secondText}>
                    Enter your grades to calculate your CGPA
                </Text>

                <View style={styles.container}>
                    <Text style={styles.firstText}>
                        0.00
                    </Text>
                    <Text style={styles.thirdText}>
                        Total CGPA
                    </Text>
                </View>

                <View style={styles.secondContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.fifthText}>1st Semester</Text>
                    </View>
                    <View style={[styles.innerContainer, { backgroundColor: "#B0BEC53D" }]}>
                        <Text style={[styles.fifthText, { color: "#000000" }]}>2nd Semester</Text>
                    </View>
                </View>
                <View style={styles.thirdContainer}>
                    <View style={{ width: "30%", alignItems: "flex-start" }}>
                        <Text style={styles.sixthText}>Course</Text>

                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'GST 101'}
                            onChangeText={text => {
                                setCourse(text);
                            }}
                            value={course}

                        />

                    </View>

                    <View style={{ width: "30%", alignItems: "flex-start" }}>
                        <Text style={styles.sixthText}>Unit</Text>

                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'1'}
                            onChangeText={text => {
                                setUnit(text);
                            }}
                            value={unit}

                        />

                    </View>
                    <View style={{ width: "30%", alignItems: "flex-start" }}>
                        <Text style={styles.sixthText}>Grade</Text>
                        <View style={styles.secondInnerContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setCourse(value)}
                            items={gradeItems}
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


                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
                    <Text style={styles.buttonText}>Save CGPA</Text>
                </TouchableOpacity>



            </View>
            {modal && <CalculatorModal modal={modal} setModal={setModal} />}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    firstText: {
        fontSize: 32,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 10,

    },
    secondText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '400',
    },
    thirdText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',

    },
    fourthText: {
        fontSize: 24,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500',

    },
    sixthText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5

    },
    seventhText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',


    },
    eighthText: {
        fontSize: 12,
        color: '#003F91',
        fontWeight: '600',

    },
    container: {
        backgroundColor: "#003F9114",
        borderRadius: 8,
        height: 100,
        marginTop: 50,
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center"

    },
    secondContainer: {
        height: 60,
        marginTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"

    },
    thirdContainer: {
        marginTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"

    },
    innerContainer: {
        width: "50%",
        height: 30,
        backgroundColor: "#003F91",
        alignItems: "center",
        justifyContent: "center"
    },

    secondInnerContainer: {
        height: 40, // Set the desired height explicitly
        borderWidth: 1,
        borderColor: "#D0D5DD",
        flexShrink: 0, // Prevent the flex layout from overriding the height
        flexGrow: 0,
        color: '#000000',
        width: "100%", // Ensure width is consistent
        backgroundColor: "#FFFFFF",
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
    layout: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }
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
        width: "100%",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        height: 40,
        width: "100%",
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

export default level;

