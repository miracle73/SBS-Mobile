import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FirstLayout = () => {
    const router = useRouter();

    return (
        <>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#FFFFFF' },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="notification"
                    options={{
                        title: "Notification",
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTintColor: '#000000',
                        headerLeft: () => (
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={24}
                                color="black"
                                style={{ marginLeft: 10 }}
                                onPress={() => router.back()}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="birthdays"
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="mediaUpload"
                    options={{
                        title: "",
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTintColor: '#000000',
                        headerLeft: () => (
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={24}
                                color="black"
                                style={{ marginLeft: 10 }}
                                onPress={() => router.back()}
                            />
                        ),
                    }}

                />
            </Stack>
        </>
    );
};

export default FirstLayout;
