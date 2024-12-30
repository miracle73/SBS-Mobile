import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const addPastQuestion = () => {
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [courseTitle, setCourseTitle] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [department, setDepartment] = useState("");
    const [topic, setTopic] = useState("");
    const [level, setLevel] = useState("");
    const [year, setYear] = useState("");
    const [photo, setPhoto] = useState<string>("");


    const levelItems = [
        { label: '100 Level', value: '100 Level' },
        { label: '200 Level', value: '200 Level' },
        { label: '300 Level', value: '300 Level' },
        { label: '400 Level', value: '400 Level' },
        { label: '500 Level', value: '500 Level' },

    ];
    const yearItems = [
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
    ];

    const departmentItems = [
        { label: 'Electrical and Electronics Engineering', value: 'Electrical and Electronics Engineering' },
        { label: 'Chemical Engineering', value: 'Chemical Engineering' },
        { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
        { label: 'Civil Engineering', value: 'Civil Engineering' },

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

        }
    };
    const handleSubmit = () => {
        if (!courseTitle || !courseCode || !topic || !year || !level) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Empty fields, please provide all information.",
            });

            return;
        }



        try {
            router.replace("/admin/coursesPastQuestions")
        } catch (error) {

        }
        finally {
            setCourseTitle(" ")
            setCourseCode(" ")
            setDepartment(" ")
            setTopic("")
            setYear("")
            setPhoto("")
        }
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ScrollView style={{ paddingHorizontal: 20, }} showsVerticalScrollIndicator={false}>

                    <Text style={styles.fourthText}>
                        Add Past Questions
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.secondText}>
                            Fill in details to add new questions
                        </Text>

                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Year</Text>
                        {/* <RNPickerSelect
                        onValueChange={(value) => setYear(value)}
                        items={yearItems}
                        placeholder={{ label: 'Choose Year', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={year}
                        Icon={() => (
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={24}
                                color="#B0BEC5"
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    /> */}
                        <DropDownPicker
                            open={open}
                            value={year}
                            items={yearItems}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen}
                            setValue={setYear}
                            placeholder="Choose Year"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                        />
                    </View>

                    <View style={[styles.pickerContainer, (open) && { zIndex: -20 }]}>
                        <Text style={styles.thirdText}>Department</Text>
                        {/* <RNPickerSelect
                        onValueChange={(value) => setDepartment(value)}
                        items={departmentItems}
                        placeholder={{ label: 'Select school', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={department}
                        Icon={() => (
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={24}
                                color="#B0BEC5"
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    /> */}
                        <DropDownPicker
                            open={open2}
                            value={department}
                            items={departmentItems}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen2}
                            setValue={setDepartment}
                            placeholder="Choose Department"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                        />
                    </View>

                    <View style={[styles.pickerContainer, (open2 || open) && { zIndex: -20 }]}>
                        <Text style={styles.thirdText}>Level</Text>
                        {/* <RNPickerSelect
                        onValueChange={(value) => setLevel(value)}
                        items={levelItems}
                        placeholder={{ label: 'Select level', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={level}
                        Icon={() => (
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={24}
                                color="#B0BEC5"
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    /> */}
                        <DropDownPicker
                            open={open3}
                            value={level}
                            items={levelItems}
                            closeAfterSelecting={true}
                            closeOnBackPressed={true}
                            listItemContainerStyle={{
                                height: 40
                            }}
                            setOpen={setOpen3}
                            setValue={setLevel}
                            placeholder="Select Level"
                            style={pickerSelectStyles.inputIOS}
                            dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Topic</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter topic'}
                            onChangeText={text => {
                                setTopic(text);
                            }}
                            value={topic}

                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Course Title</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter course title'}
                            onChangeText={text => {
                                setCourseTitle(text);
                            }}
                            value={courseTitle}

                        />
                    </View>


                    <View style={styles.pickerContainer}>
                        <Text style={styles.thirdText}>Course code</Text>
                        <TextInput
                            style={styles.secondInnerContainer}
                            placeholderTextColor='#98A2B3'
                            placeholder={'Enter course code'}
                            onChangeText={text => {
                                setCourseCode(text);
                            }}
                            value={courseCode}


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
        width: "40%"
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
        padding: 5,
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

export default addPastQuestion;
