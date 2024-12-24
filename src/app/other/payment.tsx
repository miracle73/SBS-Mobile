import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message';

const payment = () => {
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleProceed = () => {
        if (!amount || !name || !email) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Please fill out all fields before proceeding.",
            });
            return;
        }
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Please enter a valid email address.",
            });
            return;
        }
        router.push('/other/activateSubscription');
    };
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.fourthText}>
                    Make payment
                </Text>
                <Text style={styles.secondText}>
                    Secure your access to premium features. Complete your payment below.
                </Text>


                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Amount</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter amount'}
                        onChangeText={text => {
                            setAmount(text);
                        }}
                        keyboardType='numeric'
                        value={amount}

                    />
                </View>


                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Your name</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter name'}
                        onChangeText={text => {
                            setName(text);
                        }}
                        value={name}

                    />
                </View>

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


                <TouchableOpacity style={styles.button} onPress={handleProceed}>
                    <Text style={styles.buttonText}>Pay with flutterwave</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        marginTop: 70

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

export default payment;
