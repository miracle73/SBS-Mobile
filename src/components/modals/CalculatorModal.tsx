import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import TouchableOutside from './TouchableOutside'



const { width, height } = Dimensions.get('window')
interface CalculatorModalProps {
    setModal: (value: boolean) => void;
    modal: boolean;

}
const CalculatorModal = ({ setModal, modal }: CalculatorModalProps) => {
    const [level, setLevel] = useState("");
    const [course, setCourse] = useState("");

    const levelItems = [
        { label: 'Undergraduate', value: 'undergraduate' },
        { label: 'Postgraduate', value: 'postgraduate' },
        { label: 'Doctorate', value: 'doctorate' },
    ];

    const courseItems = [
        { label: 'Computer Science', value: 'cs' },
        { label: 'Mechanical Engineering', value: 'mech_eng' },
        { label: 'Economics', value: 'economics' },
        { label: 'Psychology', value: 'psychology' },
        { label: 'Physics', value: 'physics' },
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
                            <RNPickerSelect
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
                            />
                        </View>

                        {/* Course Picker */}
                        <View style={styles.pickerContainer}>
                            <Text style={styles.thirdText}>Course</Text>
                            <RNPickerSelect
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
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => setModal(false)}>
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
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default CalculatorModal
