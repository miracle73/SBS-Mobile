import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import * as Device from 'expo-device';
import { useActivateUserMutation } from '../../components/services/userService';
import Toast from 'react-native-toast-message';
import SuccessModal from '../../components/modals/SuccessModal';
import ErrorModal from '../../components/modals/ErrorModal';

const activateSubscription = () => {
    const [pin, setPin] = useState("");
    const [modal, setModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const [activateUser] = useActivateUserMutation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const handleActivate = async () => {

        try {
            setLoading(true)

            const response = await activateUser({
                phone_imei: Device.osBuildId,
                pin

            });

            if (response.error) {
              
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.error.data.detail.message,
                });

                setSecondModal(true)
                return;
            }

           setModal(true)

        } catch (error) {
            // console.error('Error rectifying user:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.data.detail.message,
            });
            return;
        } finally {
            setPin("")
            setLoading(false);

        }
    };

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.fourthText}>
                    Activate Subscription
                </Text>
                <Text style={styles.secondText}>
                    Secure your access to premium features. Complete your payment below.
                </Text>

                {/* School Picker */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Enter your 16-digit activation pin</Text>

                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter Activation Pin'}
                        onChangeText={text => {
                            setPin(text);
                        }}
                        keyboardType='numeric'
                        value={pin}

                    />
                </View>


                <TouchableOpacity style={styles.button} onPress={handleActivate}>
                    <Text style={styles.buttonText}>Activate Now</Text>
                </TouchableOpacity>
            </View>
            {modal && <SuccessModal modal={modal} setModal={setModal} />}
            {secondModal && <ErrorModal modal={secondModal} setModal={setSecondModal} />}
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
        marginTop: 40,
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

export default activateSubscription;
