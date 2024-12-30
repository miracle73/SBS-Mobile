import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import AddNotificationSuccessModal from '../../components/modals/AddNotificationSuccessModal';

const addNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const [modal, setModal] = useState(false)

    const [photo, setPhoto] = useState<string>("");



    const handleUploadPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const photoUri = result.assets[0].uri;
            setPhoto(photoUri);
            //   dispatch(setProfilePicture(photoUri))

        }
    };

     const handleSubmit = () => {
            if (!title || !message) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: "Empty fields, please provide all information.",
                });
    
                return;
            }
    
          
    
            try {

                setModal(true)
            } catch (error) {
    
            }
            finally {
                setTitle(" ")
                setMessage(" ")
                setPhoto("")
            }
        }


    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>

                <Text style={styles.fourthText}>
                    Information details
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.secondText}>
                        Add your information details here
                    </Text>

                </View>



                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Title</Text>
                    <TextInput
                        style={styles.secondInnerContainer}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter course title'}
                        onChangeText={text => {
                            setTitle(text);
                        }}
                        value={title}

                    />
                </View>


                <View style={styles.pickerContainer}>
                    <Text style={styles.thirdText}>Message Content</Text>
                    <TextInput
                        style={[styles.secondInnerContainer, { height: 150, textAlignVertical: 'top' }]}
                        placeholderTextColor='#98A2B3'
                        placeholder={'Enter message'}
                        onChangeText={text => {
                            setMessage(text);
                        }}
                        value={message}
                        multiline={true}

                    />
                </View>



                <View style={styles.thirdContainer}>
                    <View>
                        <Text style={styles.fifthText}>Course Image</Text>
                        {photo
                            ?
                            <Image source={{ uri: photo }} style={styles.image} />
                            :
                            <Text style={styles.sixthText}>Upload image</Text>
                        }

                    </View>
                    <TouchableOpacity style={styles.smallContainer} onPress={handleUploadPhoto}>
                        <Text style={styles.seventhText}>Browse files</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.button} onPress={handleSubmit}>

                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
            {modal && <AddNotificationSuccessModal modal={modal} setModal={setModal} />}
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
    image: {
        width: 100,
        height: 100,
        backgroundColor: '#A9A9A9',
        borderRadius: 50,
    },
    innerLineContainer: {
        backgroundColor: "#0337A4",
        height: 9,
        borderRadius: 20,
        width: "40%"
    },
    smallContainer: {
        borderWidth: 1,
        borderColor: "#1849D6",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#FFFFFF"
    },
    thirdContainer: {
        height: 150,
        backgroundColor: "#E7E7E9",
        borderBottomWidth: 1,
        marginTop: 20,
        borderColor: "#49454F",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,



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
        fontSize: 20,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
    },
    fifthText: {
        fontSize: 12,
        color: '#49454F',
        fontWeight: '400',
        marginBottom: 10,
        opacity: 0.5,
    },
    sixthText: {
        fontSize: 16,
        color: '#1D1B20',
        fontWeight: '400',
        opacity: 0.5,
    },
    seventhText: {
        fontSize: 12,
        color: '#1849D6',
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
        marginTop: 50,
        marginBottom: 30

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
        padding: 5
    },
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

export default addNotification;
