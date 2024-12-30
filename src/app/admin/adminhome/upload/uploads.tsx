import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { NotificationIcon, KeyIcon, SearchIcon, PadlockIcon, SnowflakeIcon, SecondNotificationIcon } from "../../../../../assets/svg";
import { useRouter } from 'expo-router';
import HomeComponent from "../../../../components/HomeComponent";


export default function Page() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 70 }}>
            <View style={styles.container}>
                <StatusBar style="dark" />


                <Text style={styles.title}>Upload </Text>
                <Text style={styles.subtitle}>Quick access to all your information</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ width: "48%", gap: 10 }}>

                        <TouchableOpacity onPress={() => { router.push("/admin/adminhome/first/allPins") }}>

                            <HomeComponent
                                Icon={KeyIcon}
                                firstText="Activate Subscription"
                                secondText="View all activation pins"
                                backgroundColor="#E53935"
                                disabled={false}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { router.push("/admin/adminhome/first/birthdays") }}>
                            <TouchableOpacity onPress={() => { router.push("/admin/coursesPastQuestions") }}>
                                <HomeComponent
                                    Icon={SnowflakeIcon}
                                    firstText="Birthdays"
                                    secondText="Upload new celebrations"
                                    backgroundColor="#E5AD35"
                                    disabled={false}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { router.push("/admin/notification") }}>
                            <HomeComponent
                                Icon={SecondNotificationIcon}
                                firstText="Notification"
                                secondText="Upload notifications"
                                backgroundColor="#FFAD84"
                                disabled={false}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "48%", gap: 10 }}>
                        <HomeComponent
                            Icon={SearchIcon}
                            firstText="Past Questions"
                            secondText="Add past questions"
                            backgroundColor="#FFAD84"
                            disabled={false}
                        />
                        <TouchableOpacity onPress={() => { router.push("/admin/adminhome/upload/course") }}>
                            <HomeComponent
                                Icon={SnowflakeIcon}
                                firstText="Lecture Notes"
                                secondText="Add lecture notes"
                                backgroundColor="#E5AD35"
                                disabled={false}
                            />
                        </TouchableOpacity>

                    </View>
                </View>


            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    secondContainer: {
        backgroundColor: "#EEEEEE",
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
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
    firstText: {
        fontSize: 20,
        color: "#1A1A1A",
        fontWeight: "700",
        marginBottom: 5,
    },
    secondText: {
        fontSize: 16,
        color: "#1A1A1A",
        fontWeight: "400",
        marginBottom: 5,
    },
    thirdText: {
        fontSize: 16,
        color: "#1D1B20",
        fontWeight: "400",
        marginBottom: 5,
    },
    fourthText: {
        fontSize: 14,
        color: "#49454F",
        fontWeight: "300",
        marginBottom: 5,
    },
});
