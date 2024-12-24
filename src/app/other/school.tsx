import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Device from 'expo-device';
import Toast from 'react-native-toast-message';
// import { useGetSchoolsQuery } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGetSchoolsQuery, useRectifyUserMutation, useGetSchoolLevelsCoursesQuery } from '../../components/services/userService';

const school = () => {
    const [school, setSchool] = useState("");
    const [schoolItems, setSchoolItems] = useState<{ label: string; value: string | number }[]>([]);
    const router = useRouter();
    const { data, isSuccess, isLoading } = useGetSchoolsQuery();
    const [rectifyUser] = useRectifyUserMutation();
    const [loading, setLoading] = useState(false);
    const { data: schoolLevelsCoursesData } = useGetSchoolLevelsCoursesQuery({ phone_imei: Device.osBuildId });

    console.log('Device ID:', Device.osBuildId);
    console.log('Device Name:', Device.deviceName);
    console.log('Model Name:', Device.modelName);
    console.log('OS Name:', Device.osName);
    console.log('OS Version:', Device.osVersion);
    console.log('Brand:', Device.brand);
    useEffect(() => {
        if (isSuccess && data?.result) {
            const formattedSchools = data.result.map((school: any) => ({
                label: school.name,
                value: school.id,
            }));
            setSchoolItems(formattedSchools);
        }
    }, [data, isSuccess]);


    const handleSave = async () => {

        try {
            setLoading(true)
            if (schoolLevelsCoursesData?.id) {
                await AsyncStorage.setItem('isAuthenticated', 'true')
                router.replace(`/home`);
                return;
            }
            const response = await rectifyUser({
                phone_imei: Device.osBuildId,
                school_id: Number(school),
                role: 'student'
            });

            if (response.error) {
                console.error('Error rectifying user:', response.error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.error.data.detail.message,
                });
                return;
            }
            await AsyncStorage.setItem('isAuthenticated', 'true');
       
            router.replace(`/home`);

        } catch (error) {
            console.error('Error rectifying user:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.data.detail.message,
            });
        } finally {
            setSchool("")
            setLoading(false);

        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF8C00" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.fourthText}>
                    Select your school
                </Text>
                <Text style={styles.secondText}>
                    Move forward with our app by selecting the school you are in.
                </Text>

                {/* School Picker */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>School</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSchool(value)}
                        items={schoolItems}
                        placeholder={{ label: 'Choose Your school', value: null }}
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
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave} >
                    {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Save</Text>}

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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
        color: '#000000',
        fontWeight: '400',
    },
    thirdText: {
        fontSize: 10,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
    },
    fourthText: {
        fontSize: 24,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    pickerContainer: {
        marginTop: 30,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 70

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
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default school;
