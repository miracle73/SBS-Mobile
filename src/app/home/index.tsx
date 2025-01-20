import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { NotificationIcon, KeyIcon, SearchIcon, PadlockIcon, SnowflakeIcon } from "../../../assets/svg";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HomeComponent from "../../components/HomeComponent";
import SubscriptionModal from "../../components/modals/SubscriptionModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchStoredBirthdays = async () => {
            const storedBirthdays = await AsyncStorage.getItem('birthdays');
            if (storedBirthdays) {
                console.log(JSON.parse(storedBirthdays), 46);
            }
        };
        fetchStoredBirthdays();
    }, []);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setModalVisible(true);
    //     }, 3000); // Show modal after 3 seconds

    //     return () => clearTimeout(timer); // Cleanup the timer on component unmount
    // }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 70 }}>
            <View style={styles.container}>
                <StatusBar style="dark" />
                <View style={styles.main}>
                    {/* <TouchableOpacity style={styles.roundedContainer} onPress={() => router.push("/other/notification")}>
                        <Ionicons name="notifications-outline" size={20} />
                    </TouchableOpacity> */}
                </View>

                <Text style={styles.title}>Welcome to SBS App</Text>
                <Text style={styles.subtitle}>Empowering Students, One student at a Time!</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 10 }}>
                    <View style={{ width: "48%", gap: 10 }}>
                        <TouchableOpacity onPress={() => router.push("/other/activation")}>
                            <HomeComponent
                                Icon={KeyIcon}
                                firstText="Activate Subscription"
                                secondText="Unlock Premium Features Today!"
                                backgroundColor="#E53935"
                                disabled={false}
                            />
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => router.push("/home/more")}>
                            <HomeComponent
                                Icon={SnowflakeIcon}
                                firstText="Birthdays"
                                secondText="Celebrate with Us!"
                                backgroundColor="#E5AD35"
                                disabled={false}
                            />
                        </TouchableOpacity>

                        <HomeComponent
                            Icon={PadlockIcon}
                            firstText="Past Questions"
                            secondText="Questions from previous exams"
                            backgroundColor="#B0BEC5"
                            disabled={true}
                        />

                    
                    </View>
                    <View style={{ width: "48%", gap: 10 }}>
                        <TouchableOpacity  onPress={() => router.push("/home/calculator")}>
                            <HomeComponent
                                Icon={SearchIcon}
                                firstText="CGPA Calculator"
                                secondText="Track Your Academic Progress"
                                backgroundColor="#FFAD84"
                                disabled={false}
                            />
                        </TouchableOpacity>
         
                            <HomeComponent
                                Icon={PadlockIcon}
                                firstText="Lecture Notes"
                                secondText="Stay ahead with our lecture notes"
                                backgroundColor="#B0BEC5"
                                disabled={true}
                            />
               
                     
                    
                    </View>
                </View>
            </View>
            {/* <SubscriptionModal modal={modalVisible} setModal={setModalVisible} /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    roundedContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDF5FF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        color: "#000000",
        fontWeight: "700",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "##000000",
        marginBottom: 15,
        width: "70%"
    },
});
