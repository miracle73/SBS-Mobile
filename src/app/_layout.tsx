import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-native-toast-notifications";
import Toast from "react-native-toast-message";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "../components/redux/store";
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";
import NotificationBadge from "../components/NotificationBadge";
import { useRouter } from "expo-router";
import { useNotifications } from "../hooks/useNotifications";

SystemUI.setBackgroundColorAsync("transparent");

const RootLayout = () => {
  const NotificationHandler = () => {
    const router = useRouter();
    // Now this hook is inside the Provider, so it will work
    const { refresh } = useNotifications();

    // Initialize notifications when app starts
    useEffect(() => {
      refresh();
    }, [refresh]);

    const handleNotificationPress = () => {
      router.push("/notifications");
    };

    return (
      <View style={styles.headerRight}>
        <NotificationBadge
          onPress={handleNotificationPress}
          size={24}
          color="#fff"
          backgroundColor="#ff4444"
          textColor="#fff"
          style={styles.notificationBadge}
        />
      </View>
    );
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  const LoadingSpinner = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"red"} />
      </View>
    );
  };
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#007AFF",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => <NotificationHandler />,
            }}
          >
            <Stack.Screen
              name="admin"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="other"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="notifications"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <Toast />
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
  notificationBadge: {
    marginRight: 0,
  },
});

export default RootLayout;
