import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { NotificationIcon, KeyIcon, SearchIcon, PadlockIcon, SnowflakeIcon } from "../../../../../assets/svg";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HomeComponent from "../../../../components/HomeComponent";
import ThumbNailImage from "../../../../../assets/images/Thumbnail.png"


export default function Page() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}>
            <View style={styles.container}>
                <StatusBar style="dark" />
                <View style={styles.main}>
                    <View style={styles.roundedContainer}>
                        <Ionicons name="notifications-outline" size={20} />
                    </View>
                </View>

                <Text style={styles.title}>Welcome Admin</Text>
                <Text style={styles.subtitle}>Quick access to all your information</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ width: "48%", gap: 10 }}>
                        <HomeComponent
                            Icon={KeyIcon}
                            firstText="Activate Subscription"
                            secondText="View all activation pins"
                            backgroundColor="#E53935"
                            disabled={false}
                        />
                        <HomeComponent
                            Icon={SnowflakeIcon}
                            firstText="Birthdays"
                            secondText="Upload new celebrations"
                            backgroundColor="#E5AD35"
                            disabled={false}
                        />

                    </View>
                    <View style={{ width: "48%", gap: 10 }}>
                        <HomeComponent
                            Icon={SearchIcon}
                            firstText="Past Questions"
                            secondText="Add past questions"
                            backgroundColor="#FFAD84"
                            disabled={false}
                        />
                        <HomeComponent
                            Icon={SnowflakeIcon}
                            firstText="Lecture Notes"
                            secondText="Add lecture notes"
                            backgroundColor="#E5AD35"
                            disabled={true}
                        />

                    </View>
                </View>

                <Text style={styles.firstText}>Recently Added</Text>
                <Text style={styles.secondText}>View all recent notes</Text>
                <View style={styles.secondContainer}>

                    <View style={{
                        width: "30%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={ThumbNailImage} />
                    </View>
                    <View style={{
                        width: "70%",
                        alignItems: "flex-start",
                        gap: 8
                    }}>
                        <Text style={styles.thirdText}>Lecture note</Text>
                        <Text style={styles.fourthText}>Added: 24th Oct, 2024</Text>
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
        alignItems: "center",
        marginTop: 10
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
        marginTop: 20
    },
    secondText: {
        fontSize: 16,
        color: "#1A1A1A",
        fontWeight: "400",
        marginTop: 10
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
