import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import AdminLoginImage from "../../../assets/images/AdminLogin.png"
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCreateAdminMutation } from '../../components/services/adminService';

const signup = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [createAdmin, { isLoading }] = useCreateAdminMutation();


    const validateEmail = (email: any) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: any) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const HandleSubmit = async () => {

        if (!email || !validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Invalid Email, Please enter a valid email address.",
            });

            return;
        }

        if (!password || !validatePassword(password)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Invalid Password, Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            });

            return;
        }
        try {
            const response = await createAdmin({ email, password }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Account created successfully.',
            });
            router.push(`/admin/login`);
        } catch (error) {
            const errorMessage = (error as any)?.data?.detail?.message || (error as any)?.data?.detail || (error as any)?.data?.message || 'Failed to create account. Please try again.';
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
            });
        } finally {
            setEmail("");
            setPassword("");
        }




    };



    return (
        <SafeAreaView style={styles.bodyContainer}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50
                    }}>
                        <Image source={AdminLoginImage} />
                    </View>
                    <Text style={styles.fourthText}>
                        Admin Dashboard Signup
                    </Text>
                    <Text style={styles.secondText}>
                        Welcome to SBS Educational Admin portal. Create your account
                    </Text>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Email address</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter email address'}
                            onChangeText={text => {
                                setEmail(text);
                            }}
                            value={email}

                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Password</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter password'}
                            onChangeText={text => {
                                setPassword(text);
                            }}
                            value={password}

                        />
                    </View>


                    <TouchableOpacity style={styles.button} onPress={HandleSubmit}>

                        {isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Create account</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20
                        }}
                        onPress={() => router.push(`/admin/login`)}>
                        <Text style={[styles.buttonText, { color: "#FF8C00" }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        color: '#000000',
        fontWeight: '400',
        marginTop: 20,
        textAlign: "center"
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
        marginTop: 20,
        textAlign: "center"
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
        marginTop: 50

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
        flexDirection: "row",


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
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default signup;
