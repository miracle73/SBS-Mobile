import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { ToastProvider } from 'react-native-toast-notifications'
import { ActivityIndicator, View } from 'react-native'
import { Provider } from 'react-redux'
import { persistor, store } from "../components/redux/store"

const RootLayout = () => {
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
                </PersistGate>
            </Provider>
        </>



    )


}

export default RootLayout