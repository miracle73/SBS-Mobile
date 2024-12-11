import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import BirthdayCard from '../../components/BirthdayCard';
import CalculatorModal from '../../components/modals/CalculatorModal';

const calculator = () => {
    const [modal, setModal] = useState(false)
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.fourthText}>
                    CGPA Calculator
                </Text>
                <Text style={styles.secondText}>
                    Calculate and keep record of your grades
                </Text>

                <View style={styles.container}>
                    <Text style={styles.firstText}>
                        0.00
                    </Text>
                    <Text style={styles.thirdText}>
                        Total CGPA
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
                    <Text style={styles.buttonText}>Calculate CGPA</Text>
                </TouchableOpacity>
            </View>
            {modal && <CalculatorModal modal={modal} setModal={setModal} />}
        </SafeAreaView>
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
    container: {
        backgroundColor: "#003F9114",
        borderRadius: 8,
        height: 150,
        marginTop: 50,
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"

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

export default calculator;

