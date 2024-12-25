import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import BackgroundImage from "../../assets/images/firstBackgroundImage.png"
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";


export default function Page() {
  const router = useRouter()
  useEffect(() => {
    const checkAuth = async () => {
        const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            router.replace('/home');
        }
    };
    checkAuth();
}, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#003F91"}}>
      <StatusBar style="light" backgroundColor="#003F91" />
      <View style={styles.container}>

        <View style={styles.main}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image source={BackgroundImage} />
          </View>

          <Text style={styles.title}>Welcome to SBS Mobile</Text>
          <Text style={styles.subtitle}>Your Ultimate Study Companion!</Text>
          <TouchableOpacity style={styles.button} onPress={() => { router.push(`/home`) }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 24,
    color: "#F5F5F5",
    fontWeight: "700",
    marginBottom: 10,
    paddingHorizontal: 20


  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#B0BEC5",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20

  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FF8C00",
    paddingVertical: 15

  }
  ,
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF"
  }
});
