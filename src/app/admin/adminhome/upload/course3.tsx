import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCreateTopicMutation } from '../../../../components/services/adminService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../components/redux/store';

const course3 = () => {
    const [topicTitle, setTopicTitle] = useState("");
    const [course, setCourse] = useState("");
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [description, setDescription] = useState("");
    const [question, setQuestion] = useState("");
    const [photo, setPhoto] = useState<string>("");
    const [createTopic, { isLoading }] = useCreateTopicMutation();
    const formData = new FormData();

    const secret = useSelector((state: RootState) => state.admin.admin.secret);
    console.log(secret);
    const questionChoices = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },


    ];
    const courseItems = [
        { label: 'Engineering', value: '1' },
        { label: 'Medicine', value: '2' },
        { label: 'Law', value: '3' },
        { label: 'Business', value: '4' },
        { label: 'Arts & Humanities', value: '5' },
    ];

    const router = useRouter();

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
            const mimeType = photoUri.endsWith(".png") ? "image/png" : photoUri.endsWith(".jpeg") ? "image/jpeg" : "image/jpg";
            formData.append("file", {
                uri: photoUri,
                name: "topic-image.jpg",
                type: mimeType,
            } as any);
        }
    };

    const handleSubmit = async () => {
        if (!topicTitle || !course || !question || !description) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Empty fields, please provide all information.",
            });

            return;
        }
        try {
            const data = {
                file: formData.get('file') as File,
                title: topicTitle,
                content: description,
                free: question === 'Yes',
                course_id: Number(course),
            };
            const response = await createTopic({ secret, data }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Topic created successfully.',
            });
            router.replace("/admin/adminhome/upload/course4");
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: (error as any).data?.detail?.message || (error as any).data?.detail || (error as any).data?.message || 'Failed to create topic. Please try again.',
            });
        } finally {
            setTopicTitle("");
            setCourse("");
            setQuestion("");
            setDescription("");
            setPhoto("");
        }
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>
                    <View style={styles.lineContainer}>
                        <View style={styles.innerLineContainer}></View>
                    </View>
                    <Text style={styles.fourthText}>
                        Fill in your topic details
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.secondText}>
                            Fill in the details about your topic.
                        </Text>

                    </View>

                    {/* Subject Picker */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Course</Text>

                        <DropDownPicker
                            open={open}
                            value={course}
                            items={courseItems}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen}
                            setValue={setCourse}
                            placeholder="Select Course"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Topic Title</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter course title'}
                            onChangeText={text => {
                                setTopicTitle(text);
                            }}
                            value={topicTitle}

                        />
                    </View>


                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Topic description</Text>
                        <TextInput
                            style={[styles.secondInnerContainer, { height: 100, textAlignVertical: 'top' }]}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter description'}
                            onChangeText={text => {
                                setDescription(text);
                            }}
                            value={description}
                            multiline={true}

                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Is this course free?</Text>

                        <DropDownPicker
                            open={open2}
                            value={question}
                            items={questionChoices}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen2}
                            setValue={setQuestion}
                            placeholder="Select option"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
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
                    <Text style={styles.eighthText}>Add 5 images max</Text>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        {isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Next</Text>}


                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAwareScrollView>
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
        width: "70%"
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: '#A9A9A9',
        borderRadius: 50,
    },
    smallContainer: {
        borderWidth: 1,
        borderColor: "#1849D6",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 30,
        width: 80,
        borderRadius: 6,
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
        paddingTop: 50,
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
    eighthText: {
        fontSize: 12,
        color: '#1A1A1A',
        fontWeight: '400',
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
    dropDownContainer: {
        borderColor: '#B0BEC5',
    },
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default course3;
