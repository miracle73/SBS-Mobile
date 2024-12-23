import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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


                <Text style={styles.fifthText}>Previous CGPA</Text>
                <Text style={styles.sixthText}>View all your past CGPAs here</Text>
                <View style={styles.secondContainer}>
                    <View style={{ justifyContent: "space-between", paddingVertical: 15, paddingHorizontal: 10, alignItems: "flex-start" }}>
                        <Text style={styles.seventhText}>100L</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <Text style={styles.eighthText}>View</Text>
                            <Text style={styles.eighthText}>Delete</Text>
                        </View>

                    </View>
                    <View style={{ justifyContent: "center", paddingVertical: 15, paddingHorizontal: 10, alignItems: "flex-end" }}>
                        <Text style={styles.seventhText}>4.98</Text>
                    </View>
                </View>
            </View>
            {modal && <CalculatorModal modal={modal} setModal={setModal} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 60,
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
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 5,
        marginTop: 50

    },
    sixthText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',

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
        height: 150,
        marginTop: 50,
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"

    },
    secondContainer: {
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        height: 80,
        marginTop: 15,
        justifyContent: "space-between",
        
        flexDirection: "row"

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

