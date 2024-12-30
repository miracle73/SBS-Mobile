import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const course2 = () => {
    const [courseTitle, setCourseTitle] = useState("");
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [open5, setOpen5] = useState(false)
    const [courseCode, setCourseCode] = useState("");
    const [department, setDepartment] = useState("");
    const [school, setSchool] = useState("");
    const [level, setLevel] = useState("");
    const [semester, setSemester] = useState("");
    const [photo, setPhoto] = useState<string>("");


    const levelItems = [
        { label: 'Year 1', value: 'year_1' },
        { label: 'Year 2', value: 'year_2' },
        { label: 'Year 3', value: 'year_3' },
        { label: 'Year 4', value: 'year_4' },
        { label: 'Year 5', value: 'year_5' },

    ];
    const semesterItems = [
        { label: 'First Semester', value: 'First Semester' },
        { label: 'Second Semester', value: 'Second Semester' },


    ];
    const schoolItems = [
        { label: 'School of Engineering', value: 'engineering' },
        { label: 'School of Medicine', value: 'medicine' },
        { label: 'School of Law', value: 'law' },
        { label: 'School of Business', value: 'business' },
        { label: 'School of Arts', value: 'arts' },
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
        if (!courseCode || !courseTitle || !department || !school || !level || !semester) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Empty fields, please provide all information.",
            });

            return;
        }



        try {
            router.replace("/admin/adminhome/upload/course3")
        } catch (error) {

        }
        finally {
            setCourseCode(" ")
            setCourseTitle(" ")
            setDepartment(" ")
            setSchool("")
            setLevel("")
            setSemester("")
            setPhoto("")
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
                    Provide your course details
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.secondText}>
                        Fill in the details about your course.
                    </Text>

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
                <View style={styles.pickerContainer}>
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
                        open={open}
                        value={department}
                        items={departmentItems}
                        closeAfterSelecting={true}
                        closeOnBackPressed={true}
                        listItemContainerStyle={{
                            height: 40
                        }}
                        setOpen={setOpen}
                        setValue={setDepartment}
                        placeholder="Choose Department"
                        style={pickerSelectStyles.inputIOS}
                        dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                    />
                </View>
                <View style={[styles.pickerContainer, (open) && { zIndex: -20 }]} >
                    <Text style={styles.thirdText}>School</Text>
                    {/* <RNPickerSelect
                        onValueChange={(value) => setSchool(value)}
                        items={schoolItems}
                        placeholder={{ label: 'Select school', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={school}
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
                        value={school}
                        items={schoolItems}
                        closeAfterSelecting={true}
                        closeOnBackPressed={true}
                        listItemContainerStyle={{
                            height: 40
                        }}
                        setOpen={setOpen2}
                        setValue={setSchool}
                        placeholder="Select school"
                        style={pickerSelectStyles.inputIOS}
                        dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                    />
                </View>
                <View style={[styles.pickerContainer, (open2 || open) && { zIndex: -20 }]}>
                    <Text style={styles.thirdText}>Semester</Text>
                    {/* <RNPickerSelect
                        onValueChange={(value) => setSemester(value)}
                        items={semesterItems}
                        placeholder={{ label: 'Select semester', value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        value={semester}
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
                        value={semester}
                        items={semesterItems}
                        closeAfterSelecting={true}
                        closeOnBackPressed={true}
                        listItemContainerStyle={{
                            height: 40
                        }}
                        setOpen={setOpen3}
                        setValue={setSemester}
                        placeholder="Select semester"
                        style={pickerSelectStyles.inputIOS}
                        dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                    />
                </View>
                <View style={[styles.pickerContainer, (open3 || open2 || open) && { zIndex: -20 }]}>
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
                        open={open4}
                        value={level}
                        items={levelItems}
                        closeAfterSelecting={true}
                        closeOnBackPressed={true}
                        listItemContainerStyle={{
                            height: 40
                        }}
                        setOpen={setOpen4}
                        setValue={setLevel}
                        placeholder="Select level"
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


                <TouchableOpacity style={styles.button} onPress={handleSubmit}>

                    <Text style={styles.buttonText}>Create lecture Note</Text>
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

export default course2;
