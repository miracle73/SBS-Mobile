import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
// import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const allPins = () => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    // const handleCopy = (pin: any) => {
    //     Clipboard.setString(pin);
    //     Toast.show({
    //         type: 'success',
    //         text1: 'Success',
    //         text2: ` Pin ${pin} copied to clipboard.`,
    //     });

    // };

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
                <Text style={styles.fourthText}>
                    All pins
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.secondText}>
                        View all pins created and associated to this platform.
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.firstText}>id</Text>
                    {/* <TouchableOpacity onPress={() => handleCopy('10010')}> */}
                        <Text style={styles.firstText}>code</Text>
                    {/* </TouchableOpacity> */}
                    <Text style={styles.firstText}>Status</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.thirdText}>1</Text>
                    {/* <TouchableOpacity onPress={() => handleCopy('10010')}> */}
                        <Text style={styles.thirdText}>10010</Text>
                    {/* </TouchableOpacity> */}
                    <View style={styles.smallContainer}>
                        <Text style={styles.fifthText}>Status</Text>
                    </View>

                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.thirdText}>2</Text>
                    <Text style={styles.thirdText}>10010</Text>
                    <View style={styles.secondSmallContainer}>
                        <Text style={styles.sixthText}>Status</Text>
                    </View>

                </View>


                <TouchableOpacity style={styles.button} onPress={() => { router.push("/admin/adminhome/upload/newPins") }}>

                    <Text style={styles.buttonText}>Create pin</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    smallContainer: {
        borderWidth: 1,
        borderColor: "#A40303",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 30,
        width: 60,
        borderRadius: 6,
        backgroundColor: "#A4030314"
    },
    secondSmallContainer: {
        borderWidth: 1,
        borderColor: "#4CAF50",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 30,
        width: 60,
        borderRadius: 6,
        backgroundColor: "#4CAF503D"
    },
    bodyContainer: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    firstText: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '500',

    },
    secondText: {
        fontSize: 14,
        color: '#6D6D6D',
        fontWeight: '400',
    },
    thirdText: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',

    },
    fourthText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 12,
        color: '#A40303',
        fontWeight: '500',

    },
    sixthText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',

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
        marginTop: 60,
        marginBottom: 20

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },
    container: {
        marginTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#E3E3E3",
        paddingVertical: 10,
        paddingHorizontal: 10

    },

    secondContainer: {
        marginTop: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.4,
        borderColor: "#B0BEC5"
    },
});


export default allPins;
