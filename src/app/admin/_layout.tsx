import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AdminLayout = () => {
    const router = useRouter();

    return (
        <>
            <StatusBar style="dark" />
            <Stack
            >
                <Stack.Screen
                    name="adminhome"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="coursesPastQuestions"
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
                <Stack.Screen
                    name="addPastQuestion"
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
                <Stack.Screen
                    name="notification"
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
                <Stack.Screen
                    name="addNotification"
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

export default AdminLayout;
