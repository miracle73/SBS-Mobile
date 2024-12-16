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
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="login"
                    options={{headerShown: false}}

                />

            </Stack>
        </>
    );
};

export default AdminLayout;
