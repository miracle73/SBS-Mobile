import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BirthdayCard from '../../components/BirthdayCard';

const birthdayCelebration = () => {

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.fourthText}>
                    Birthday Celebration
                </Text>
                <Text style={styles.secondText}>
                    View all celebrants
                </Text>

                <Text style={styles.firstText}>Today’s Birthday Stars</Text>
                <View style={styles.layout}>
                    <View style={{ width: "47%" }}>
                        <BirthdayCard />
                        <BirthdayCard />
                    </View>
                    <View style={{ width: "47%" }}>
                        <BirthdayCard />
                        <BirthdayCard />
                    </View>
                </View>

            </View>
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
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 5,
        marginTop: 30
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
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 20

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

export default birthdayCelebration;

