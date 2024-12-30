import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React from 'react';
import FirstImage from "../../../../../assets/images/Dropdown.png"
import { useRouter } from 'expo-router';
const course4 = () => {

const router = useRouter()

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
                <View style={styles.lineContainer}>
                    <View style={styles.innerLineContainer}></View>
                </View>
                <Text style={styles.fourthText}>
                    Preview your course
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <Text style={styles.secondText}>
                        Check if this is what you want, click on the upload button if everything is correct.
                    </Text>

                </View>

                <Image source={FirstImage} />

                <Text style={styles.firstText}>Object Oriented Program</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 10
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",

                    }}>
                        <Text style={styles.fifthText}>Course Code:</Text>
                        <Text style={styles.sixthText}>CSC 302</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",

                    }}>
                        <Text style={styles.fifthText}>Year: </Text>
                        <Text style={styles.sixthText}>2019</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: 16,
                    alignItems: "center",
                    marginTop: 10
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",

                    }}>
                        <Text style={styles.fifthText}>Dept: </Text>
                        <Text style={styles.sixthText}>Computer Science</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",

                    }}>
                        <Text style={styles.fifthText}>Level: </Text>
                        <Text style={styles.sixthText}>300</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: 16,
                    alignItems: "center",
                    marginTop: 10
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",

                    }}>
                        <Text style={styles.fifthText}>Topics: </Text>
                        <Text style={styles.sixthText}>5 topics</Text>
                    </View>


                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.seventhText}>Topic 1</Text>
                    <Text style={[styles.seventhText, { fontSize: 14 }]}>CONCEPT OF ELECTRIC CHARGE</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.seventhText}>Topic 1</Text>
                    <Text style={[styles.seventhText, { fontSize: 14 }]}>CONCEPT OF ELECTRIC CHARGE</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.seventhText}>Topic 1</Text>
                    <Text style={[styles.seventhText, { fontSize: 14 }]}>CONCEPT OF ELECTRIC CHARGE</Text>
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => { router.replace("/admin/adminhome/upload/course5") }}>

                    <Text style={styles.buttonText}>Upload Course</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    lineContainer: {
        backgroundColor: "#E6EBF6",
        height: 9,
        borderRadius: 20,
        marginVertical: 20
    },
    innerLineContainer: {
        backgroundColor: "#0337A4",
        height: 9,
        borderRadius: 20,
        width: "100%"
    },

    bodyContainer: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    firstText: {
        fontSize: 24,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 10
    },
    secondText: {
        fontSize: 14,
        color: '#6D6D6D',
        fontWeight: '400',
    },
    thirdText: {
        fontSize: 14,
        color: '#101928',
        fontWeight: '500',
        marginBottom: 5,
    },
    fourthText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '700',

    },
    sixthText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '400',
    },
    seventhText: {
        fontSize: 16,
        color: '#B7B7BC',
        fontWeight: '700',
    },

    pickerContainer: {
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        gap: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 50,
        marginBottom: 20

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },
    secondContainer: {
        height: 60,
        marginTop: 25,
        padding: 10,
        backgroundColor: "#FEF7FF",
        opacity: 0.5

    },
});


export default course4;
