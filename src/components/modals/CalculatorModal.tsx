import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import TouchableOutside from './TouchableOutside'
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';



const { width, height } = Dimensions.get('window')
interface CalculatorModalProps {
    setModal: (value: boolean) => void;
    modal: boolean;

}
const CalculatorModal = ({ setModal, modal }: CalculatorModalProps) => {
    const [level, setLevel] = useState("");
    const [course, setCourse] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const router = useRouter();

    const handleSubmit = () => {
        if (level === "" || course === "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Please select a level and course",
            });
            return;
        }
        router.push({
            pathname: '/other/level',
            params: { level: JSON.stringify(level), course: JSON.stringify(course) },

        });

        setModal(false)
    }
    const levelItems = [
        { label: '100 Level', value: '100 Level' },
        { label: '200 Level', value: '200 Level' },
        { label: '300 Level', value: '300 Level' },
        { label: '400 Level', value: '400 Level' },
        { label: '500 Level', value: '500 Level' },
    ];

    const courseItems = [
        { label: 'Agricultural Economics', value: 'agricultural_economics' },
        { label: 'Agricultural Engineering', value: 'agricultural_engineering' },
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Animal Science and Technology', value: 'animal_science_and_technology' },
        { label: 'Architecture', value: 'architecture' },
        { label: 'Biochemistry', value: 'biochemistry' },
        { label: 'Biological Science', value: 'biological_science' },
        { label: 'Biology', value: 'biology' },
        { label: 'Biomedical Engineering', value: 'biomedical_engineering' },
        { label: 'Biotechnology', value: 'biotechnology' },
        { label: 'Building Technology', value: 'building_technology' },
        { label: 'Chemical Engineering', value: 'chemical_engineering' },
        { label: 'Chemistry', value: 'chemistry' },
        { label: 'Civil Engineering', value: 'civil_engineering' },
        { label: 'Computer Engineering', value: 'computer_engineering' },
        { label: 'Computer Science', value: 'computer_science' },
        { label: 'Crop Science and Technology', value: 'crop_science_and_technology' },
        { label: 'Cyber Security Science', value: 'cyber_security_science' },
        { label: 'Dental Technology', value: 'dental_technology' },
        { label: 'Electrical/Electronics Engineering', value: 'electrical_electronics_engineering' },
        { label: 'Electronics Engineering', value: 'electronics_engineering' },
        { label: 'Entrepreneurship and Innovation', value: 'entrepreneurship_and_innovation' },
        { label: 'Environmental Health Science', value: 'environmental_health_science' },
        { label: 'Environmental Management', value: 'environmental_management' },
        { label: 'Fisheries and Aquaculture Technology', value: 'fisheries_and_aquaculture_technology' },
        { label: 'Food Science and Technology', value: 'food_science_and_technology' },
        { label: 'Forensic Science', value: 'forensic_science' },
        { label: 'Forestry and Wildlife Technology', value: 'forestry_and_wildlife_technology' },
        { label: 'Geology', value: 'geology' },
        { label: 'History and International Studies', value: 'history_and_international_studies' },
        { label: 'Human Physiology', value: 'human_physiology' },
        { label: 'Information Technology', value: 'information_technology' },
        { label: 'Logistics and Transport Technology', value: 'logistics_and_transport_technology' },
        { label: 'Mathematics', value: 'mathematics' },
        { label: 'Mechanical Engineering', value: 'mechanical_engineering' },
        { label: 'Mechatronics Engineering', value: 'mechatronics_engineering' },
        { label: 'Medicine and Surgery', value: 'medicine_and_surgery' },
        { label: 'Metallurgical and Materials Engineering', value: 'metallurgical_and_materials_engineering' },
        { label: 'Microbiology', value: 'microbiology' },
        { label: 'Optometry', value: 'optometry' },
        { label: 'Petroleum Engineering', value: 'petroleum_engineering' },
        { label: 'Physics', value: 'physics' },
        { label: 'Polymer and Textile Engineering', value: 'polymer_and_textile_engineering' },
        { label: 'Prosthesis and Orthopaedic Technology', value: 'prosthesis_and_orthopaedic_technology' },
        { label: 'Public Health Technology', value: 'public_health_technology' },
        { label: 'Quantity Surveying', value: 'quantity_surveying' },
        { label: 'Radiography Science', value: 'radiography_science' },
        { label: 'Science Laboratory Technology', value: 'science_lab_technology' },
        { label: 'Software Engineering', value: 'software_engineering' },
        { label: 'Soil Science and Technology', value: 'soil_science_and_technology' },
        { label: 'Statistics', value: 'statistics' },
        { label: 'Supply Chain Management', value: 'supply_chain_management' },
        { label: 'Surveying and Geo-Informatics', value: 'surveying_and_geo_informatics' },
        { label: 'Urban and Regional Planning', value: 'urban_and_regional_planning' },
    ];


    return (
        <Modal
            animationType="slide"
            transparent={true}
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);

            }}
        >
            <TouchableOutside onPress={() => setModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <Text style={styles.firstText}>Add Level</Text>
                        {/* Level Picker */}
                        <View style={[styles.pickerContainer, { marginTop: 10 }]}>
                            <Text style={styles.thirdText}>Level</Text>
                            <DropDownPicker
                                open={open}
                                value={level}
                                items={levelItems}
                                closeAfterSelecting={true}
                                closeOnBackPressed={true}
                                listItemContainerStyle={{
                                    height: 40
                                }}
                                setOpen={setOpen}
                                setValue={setLevel}
                                placeholder="Select Level"
                                style={pickerSelectStyles.inputIOS}
                                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                            />
                            {/* <RNPickerSelect
                                onValueChange={(value) => setLevel(value)}
                                items={levelItems}
                                placeholder={{ label: 'Select Level', value: null }}
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
                        </View>

                        {/* Course Picker */}
                        <View style={[styles.pickerContainer, open && { zIndex: -20 }]}>
                            <Text style={styles.thirdText}>Course</Text>
                            <DropDownPicker
                                open={open2}
                                value={course}
                                items={courseItems}
                                closeAfterSelecting={true}
                                closeOnBackPressed={true}
                                listItemContainerStyle={{
                                    height: 40
                                }}
                                setOpen={setOpen2}
                                setValue={setCourse}
                                placeholder="Select Course"
                                style={pickerSelectStyles.inputIOS}
                                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                            />
                            {/* <RNPickerSelect
                                onValueChange={(value) => setCourse(value)}
                                items={courseItems}
                                placeholder={{ label: 'Select Course', value: null }}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                                value={course}
                                Icon={() => (
                                    <MaterialIcons
                                        name="keyboard-arrow-down"
                                        size={24}
                                        color="#B0BEC5"
                                        style={{ alignSelf: 'center' }}
                                    />
                                )}
                            /> */}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>



                    </View>
                </View>
            </TouchableOutside>
        </Modal>
    )
}

const styles = StyleSheet.create({

    pickerContainer: {
        marginTop: 20,
        width: "100%"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 20,
        width: "80%"

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },

    modalContent: {
        width: width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        height: height * 0.40,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    firstText: {
        fontSize: 14,
        fontWeight: "700",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 10,
        textAlign: "center"
    },
    secondText: {
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 10,
        textAlign: "center"

    },
    thirdText: {
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#FFFFFF",
    },

})


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


export default CalculatorModal
