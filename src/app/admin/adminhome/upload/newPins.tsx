import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGeneratePinMutation } from '../../../../components/services/adminService';
import { RootState } from '../../../../components/redux/store';
import { useSelector } from 'react-redux';

const newPins = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [amount, setAmount] = useState("");
    const [digits, setDigits] = useState("");
    const [level, setLevel] = useState("");
    const [semester, setSemester] = useState("");
    const [generatePin, { isLoading }] = useGeneratePinMutation();
   
    const secret = useSelector((state: RootState) => state.admin.admin.secret);
    console.log(secret);

    const levelItems = [
        { label: 'Year 1', value: '1' },
        { label: 'Year 2', value: '2' },
        { label: 'Year 3', value: '3' },
        { label: 'Year 4', value: '4' },
        { label: 'Year 5', value: '5' },

    ];
    const semesterItems = [
        { label: 'First Semester', value: 'First Semester' },
        { label: 'Second Semester', value: 'Second Semester' },


    ];


    const router = useRouter();

    const handleSubmit = async () => {
        if (!amount || !digits || !level || !semester) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Empty fields, please provide all information.",
            });

            return;
        }

        try {
            const data = {
                level: Number(level),
                num_digits: parseInt(digits, 10),
                num_pins: parseInt(amount, 10),
                semester,
            };
            const response = await generatePin({ secret, data }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Pins generated successfully.',
            });
            router.push("/admin/adminhome/first/allPins");
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: (error as any).data?.detail?.message || (error as any).data?.detail || (error as any).data?.message || 'Failed to generate pins. Please try again.',
            });
        } finally {
            setSemester("");
            setLevel("");
            setDigits("");
            setAmount("");
        }
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ paddingHorizontal: 20, }} >
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
                            placeholder={'Enter amount'}
                            onChangeText={text => {
                                setAmount(text);
                            }}
                            value={amount}
                            keyboardType="numeric"
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
                            keyboardType="numeric"

                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Level</Text>
                        <DropDownPicker
                            open={open}
                            value={level}
                            items={levelItems}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen}
                            setValue={setLevel}
                            placeholder="Select Level"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                        />

                    </View>


                    <View style={[styles.pickerContainer, (open) && { zIndex: -20 }]}>
                        <Text style={styles.thirdText}>Semester</Text>
                        <DropDownPicker
                            open={open2}
                            value={semester}
                            items={semesterItems}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen2}
                            setValue={setSemester}
                            placeholder="Choose semester"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                        />

                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        {isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Generate Pin</Text>}

                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
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
        padding: 5
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

export default newPins;
