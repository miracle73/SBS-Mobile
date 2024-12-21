import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const UploadLayout = () => {
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
                    name="uploads"
                    options={{
                        headerShown: false,
                    }}

                />
                <Stack.Screen
                    name="newPins"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="course"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="course2"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="course3"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="course4"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="course5"
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

export default UploadLayout;
