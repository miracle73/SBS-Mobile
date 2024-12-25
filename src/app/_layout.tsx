import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import React, {useEffect} from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { ToastProvider } from 'react-native-toast-notifications'
import Toast from 'react-native-toast-message'
import { ActivityIndicator, View } from 'react-native'
import { Provider } from 'react-redux'
import { persistor, store } from "../components/redux/store"
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from 'expo-splash-screen';

SystemUI.setBackgroundColorAsync("transparent");

const RootLayout = () => {
    useEffect(() => {
        async function prepare() {
          try {
    
            await SplashScreen.preventAutoHideAsync();
    
            await new Promise(resolve => setTimeout(resolve, 1000));
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
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size={'large'} color={'red'} />
            </View>
        )
    }
    return (
        <>
            <StatusBar style="dark" />
            <Provider store={store}>
                <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
                    <Stack screenOptions={{ headerShown: false }} />
                    <Toast />
                </PersistGate>
            </Provider>
        </>



    )


}

export default RootLayout