import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import TouchableOutside from './TouchableOutside'
import { InfoTriangle } from '../../../assets/svg';



const { width, height } = Dimensions.get('window')
interface ErrorModalProps {
    setModal: (value: boolean) => void;
    modal: boolean;

}
const ErrorModal = ({ setModal, modal }: ErrorModalProps) => {


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
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10
                        }}>
                            <View style={styles.roundedContainer}>
                                <InfoTriangle />
                            </View>
                        </View>
                        <Text style={styles.firstText}>Something went wrong</Text>
                        <Text style={styles.secondText}>Oops! That pin is invalid or expired. Please try again.</Text>


                        <TouchableOpacity style={styles.button} onPress={() => setModal(false)}>
                            <Text style={styles.buttonText}>Try again</Text>
                        </TouchableOpacity>




                    </View>
                </View>
            </TouchableOutside>
        </Modal>
    )
}

const styles = StyleSheet.create({

    roundedContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: "#FBEAE9",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
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

    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },

    modalContent: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 20,
        alignItems: "center",
        height: height * 0.35,
        paddingHorizontal: 20,
        marginHorizontal: 25,
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


export default ErrorModal
