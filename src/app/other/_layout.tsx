import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const OtherLayout = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#000000",
          headerTitleStyle: { fontWeight: "bold" },
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
            title: "Topics",
          }}
        />
        <Stack.Screen
          name="pastQuestionTopic"
          options={{
            title: "Past Questions",
          }}
        />
        <Stack.Screen
          name="pastQuestion"
          options={{
            title: "Past Questions",
          }}
        />
        <Stack.Screen
          name="pastQuestionYear"
          options={{
            title: "Past Question Years",
          }}
        />
        <Stack.Screen
          name="note"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="calculator"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="level"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="activation"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="videoscreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="activateSubscription"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="school"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notification"
          options={{
            title: "Notification",
            headerTitleAlign: "center",
          }}
        />
      </Stack>
    </>
  );
};

export default OtherLayout;
