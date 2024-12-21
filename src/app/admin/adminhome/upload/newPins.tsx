import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';

const newPins = () => {
    const [amount, setAmount] = useState("");
    const [digits, setDigits] = useState("");
    const [level, setLevel] = useState("");
    const [semester, setSemester] = useState("");
    const levelItems = [
        { label: 'Year 1', value: 'year_1' },
        { label: 'Year 2', value: 'year_2' },
        { label: 'Year 3', value: 'year_3' },
        { label: 'Year 4', value: 'year_4' },
        { label: 'Year 5', value: 'year_5' },

    ];
    const semesterItems = [
        { label: 'First Semester', value: 'First Semester' },
        { label: 'Second Semester', value: 'Second Semester' },
        

    ];


    const router = useRouter();


    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
                <Text style={styles.fourthText}>
                    Create pins for students to use
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.secondText}>
                        Create pins to generate tokens for students use.
                    </Text>

                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Token Amount</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter amout'}
                        onChangeText={text => {
                            setAmount(text);
                        }}
                        value={amount}

                    />
                </View>


                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Digits</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter digits'}
                        onChangeText={text => {
                            setDigits(text);
                        }}
                        value={digits}

                    />
                </View>
            
                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Level</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setLevel(value)}
                        items={levelItems}
                        placeholder={{ label: 'Select level', value: null }}
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

             
                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Semester</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSemester(value)}
                        items={semesterItems}
                        placeholder={{ label: 'Choose semester', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={semester}
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

                <TouchableOpacity style={styles.button}>

                    <Text style={styles.buttonText}>Generate Pin</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    thirdContainer: {
        height: 150,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: "#003F91",
        borderStyle: "dashed",
        alignItems: "center",
        padding: 10,
        gap: 6
    },
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
        fontSize: 24,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 14,
        color: '#0B0B0B',
        fontWeight: '400',
        marginVertical: 10,
    },
    sixthText: {
        fontSize: 12,
        color: '#003F91',
        fontWeight: '600',
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
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"

    },

    secondInnerContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        flexShrink: 0,
        flexGrow: 0,
        color: '#000000',
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
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

export default newPins;
