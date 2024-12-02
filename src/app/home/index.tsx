import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NotificationIcon } from "../../../assets/svg";
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Page() {
    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 0 }}>
            <View style={styles.container}>
                <StatusBar style="dark" />
                <View style={styles.main}>
                    <View style={styles.roundedContainer}>
                        <Ionicons name="notifications-outline" size={20} />
                    </View>
                </View>

                <Text style={styles.title}>Welcome to SBS App</Text>
                <Text style={styles.subtitle}>Empowering Students, One student at a Time!</Text>
                <View>
                    <View>

                    </View>
                    <View>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        
        paddingHorizontal: 20
    },
    roundedContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDF5FF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    main: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        color: "#000000",
        fontWeight: "700",
        marginBottom: 5,

    },
    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "##000000",
        marginBottom: 15,


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
