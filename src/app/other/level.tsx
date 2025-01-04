import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCGPA } from '../../components/redux/slices/userSlice';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ConfirmModal from '../../components/modals/ConfirmModal';
import FirstSemester from '../../components/FirstSemester';
import SecondSemester from '../../components/SecondSemester';
import { RouteProp } from '@react-navigation/native';

type LevelRouteProp = RouteProp<{ params: { level: string; course: string } }, 'params'>;

const Level = ({ route }: { route: LevelRouteProp }) => {
    const router = useRouter();
    const { course, level } = useLocalSearchParams() as { course: string; level: string };
    console.log(course, level)
    const dispatch = useDispatch();
   

    const [selectedSemester, setSelectedSemester] = useState('1st Semester');
    const [modal, setModal] = useState(false);
    const [totalCGPA, setTotalCGPA] = useState(0.00);

    const updateCGPA = (cgpa: any) => {
        setTotalCGPA(cgpa);
    };

    // useEffect(() => {
    //     if (course && level) {
    //         dispatch(setCGPA({ level, course, value: totalCGPA }));
    //     }
    // }, [totalCGPA, course, level, dispatch]);
    
    useEffect(() => {
        if (course && level && !isNaN(totalCGPA)) {
            dispatch(setCGPA({ level, course, value: totalCGPA }));
        }
    }, [totalCGPA, course, level, dispatch]);
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }} showsHorizontalScrollIndicator={false}>
                <Text style={styles.secondText}>
                    Enter your grades to calculate your CGPA
                </Text>

                <View style={styles.container}>
                    <Text style={styles.firstText}>
                        {totalCGPA}
                    </Text>
                    <Text style={styles.thirdText}>
                        Total CGPA
                    </Text>
                </View>

                <View style={styles.secondContainer}>
                    <TouchableOpacity
                        style={[styles.innerContainer, selectedSemester === '1st Semester' && styles.selectedContainer]}
                        onPress={() => setSelectedSemester('1st Semester')}
                    >
                        <Text style={[styles.fifthText, selectedSemester === '1st Semester' && styles.selectedText]}>1st Semester</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.innerContainer, selectedSemester === '2nd Semester' && styles.selectedContainer]}
                        onPress={() => setSelectedSemester('2nd Semester')}
                    >
                        <Text style={[styles.fifthText, selectedSemester === '2nd Semester' && styles.selectedText]}>2nd Semester</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.thirdContainer}>
                    {selectedSemester === '1st Semester' ? <FirstSemester setTotalCGPA={setTotalCGPA} totalCGPA={totalCGPA} /> : <SecondSemester setTotalCGPA={setTotalCGPA} totalCGPA={totalCGPA} />}
                </View>

            </ScrollView>
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
    fifthText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
    },
    selectedText: {
        color: '#FFFFFF',
    },
    sixthText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
    },
    container: {
        backgroundColor: "#003F9114",
        borderRadius: 8,
        height: 100,
        marginTop: 50,
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    secondContainer: {
        height: 60,
        marginTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    thirdContainer: {
        marginVertical: 15,
        marginBottom: 30,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    innerContainer: {
        width: "50%",
        height: 30,
        backgroundColor: "#003F9114",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedContainer: {
        backgroundColor: "#003F91",
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
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 35,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    layout: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default Level;
