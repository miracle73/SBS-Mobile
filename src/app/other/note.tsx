import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'
import NoteImage from "../../../assets/images/note-image.png"
import SecondNoteImage from "../../../assets/images/second-note-image.png"
import VideoThumbnail from "../../../assets/images/Video Thumbnail.png"


const note = () => {
    const [note, setNote] = useState("");

    const router = useRouter()
    const { content } = useLocalSearchParams();
    const searchResults = typeof content === 'string' ? JSON.parse(content) : [];
    console.log(searchResults, 67)

    const noteItems = [
        { label: 'Harvard University', value: 'harvard' },
        { label: 'Stanford University', value: 'stanford' },
        { label: 'MIT', value: 'mit' },
        { label: 'University of Oxford', value: 'oxford' },
        { label: 'University of Cambridge', value: 'cambridge' },
    ];



    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, }}>


                {/* Institution Picker */}
                {/* <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>All notes</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setNote(value)}
                        items={noteItems}
                        placeholder={{ label: 'Select note', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={note}
                        Icon={() => (
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={24}
                                color="#B0BEC5"
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    />
                </View> */}

                <Text style={styles.firstText}>{searchResults.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Image source={NoteImage} style={{ marginTop: 20 }} />
                </View>
                <Text style={styles.fourthText}>
                    {searchResults.content}
                </Text>

                {/* <View style={styles.container}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#B0BEC5" }]}
                        onPress={() => { router.back(); }}
                    >
                        <Text style={[styles.buttonText, { color: "#B0BEC5" }]}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        disabled={true}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View> */}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    bodyContainer: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    firstText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginVertical: 5,
        marginTop: 10,
        textAlign: "center"
    },
    secondText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 10,
    },
    thirdText: {
        fontSize: 10,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
    },
    fourthText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
        marginTop: 20
    },
    fifthText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 5,
    },
    pickerContainer: {
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 20,
        width: "45%"

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        color: '#000000',
        paddingRight: 30,
        alignSelf: 'stretch',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        color: '#000000',
        paddingRight: 30,
        alignSelf: 'stretch',
    },
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default note;
