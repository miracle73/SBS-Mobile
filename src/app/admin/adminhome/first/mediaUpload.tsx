import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import { CancelIcon, Line, PlusIcon } from '../../../../../assets/svg';
import UploadImage from "../../../../../assets/images/upload.png"

const mediaUpload = () => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();


    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20,  }} showsVerticalScrollIndicator={false}>
                <Text style={styles.fourthText}>
                    Media Upload
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ width: "70%" }}>
                        <Text style={styles.secondText}>
                            Add your documents here, and you can upload up to 5 files max
                        </Text>
                    </View>
                    <View>
                        <CancelIcon />
                    </View>


                </View>
                <View style={styles.thirdContainer}>
                    <Image source={UploadImage} />
                    <Text>Drag your file(s) to start uploading</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 4, alignItems: "center" }}>
                        <Line />
                        <Text>OR</Text>
                        <Line />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#003F91",
                        borderRadius: 8,
                        padding: 5,
                    }}>
                        <Text style={styles.sixthText}>Browse files</Text>
                    </View>
                </View>

                <Text style={styles.secondText}>
                    Only support .png, .jpeg files
                </Text>


                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Date</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Type a message'}
                        onChangeText={text => {
                            setDate(text);
                        }}
                        value={date}

                    />
                </View>


                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Name</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter name'}
                        onChangeText={text => {
                            setName(text);
                        }}
                        value={name}

                    />
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Birthday message</Text>
                    <TextInput
                        style={[styles.secondInnerContainer, , { height: 100, textAlignVertical: 'top' }]}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Type a message'}
                        onChangeText={text => {
                            setMessage(text);
                        }}
                        value={message}
                        multiline={true}
                    />
                </View>


                <TouchableOpacity style={styles.button}>
                    <PlusIcon />
                    <Text style={styles.buttonText}>Save celebrant</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    thirdContainer: {
        height: 150,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: "#003F91",
        borderStyle: "dashed",
        alignItems: "center",
        padding: 10,
        gap: 6
    },
    bodyContainer: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#FFFFFF',
        
    },
    firstText: {
        fontSize: 24,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
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
        fontSize: 24,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 14,
        color: '#0B0B0B',
        fontWeight: '400',
        marginVertical: 10,
    },
    sixthText: {
        fontSize: 12,
        color: '#003F91',
        fontWeight: '600',
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
        marginTop: 40,
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
        marginTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"

    },

    secondInnerContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        flexShrink: 0,
        flexGrow: 0,
        color: '#000000',
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
});

export default mediaUpload;
