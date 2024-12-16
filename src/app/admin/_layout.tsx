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
                screenOptions={{
                    headerStyle: { backgroundColor: '#FFFFFF' },
                    headerTintColor: '#000000',
                    headerTitleStyle: { fontWeight: 'bold', }, // Centers the header title
                    // headerLeft: () => (
                    //     <MaterialIcons
                    //         name="arrow-back-ios"
                    //         size={24}
                    //         color="black"
                    //         style={{ marginLeft: 10 }}
                    //         onPress={() => router.back()} // Custom back button functionality
                    //     />
                    // ),
                }}
            >
                <Stack.Screen
                    name="adminhome"
                
                />
                <Stack.Screen
                    name="login"
              
                />
                
            </Stack>
        </>
    );
};

export default AdminLayout;
