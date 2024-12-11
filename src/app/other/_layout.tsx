import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const OtherLayout = () => {
    const router = useRouter(); // Hook for navigation

    return (
        <>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#FFFFFF' },
                    headerTintColor: '#000000',
                    headerTitleStyle: { fontWeight: 'bold', }, // Centers the header title
                    headerLeft: () => (
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={24}
                            color="black"
                            style={{ marginLeft: 10 }}
                            onPress={() => router.back()} // Custom back button functionality
                        />
                    ),
                }}
            >
                <Stack.Screen
                    name="search"
                    options={{
                        title: "Search result",
                    }}
                />
                <Stack.Screen
                    name="topics"
                    options={{
                        title: "Bio 101 Topics",
                    }}
                />
                <Stack.Screen
                    name="note"
                    options={{
                        title: "",
                    }}

                />
                <Stack.Screen
                    name="pastQuestions"
                    options={{
                        title: "Past Questions",
                    }}
                />

                <Stack.Screen
                    name="birthdayCelebration"
                    options={{
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="calculator"
                    options={{
                        title: "",
                    }}
                />

            </Stack>
        </>
    );
};

export default OtherLayout;
