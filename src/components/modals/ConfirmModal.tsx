import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import TouchableOutside from './TouchableOutside'
import { InfoTriangle } from '../../../assets/svg';



const { width, height } = Dimensions.get('window')
interface ConfirmModalProps {
    setModal: (value: boolean) => void;
    modal: boolean;

}
const ConfirmModal = ({ setModal, modal }: ConfirmModalProps) => {
    
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
                        <Text style={styles.firstText}>Confirm</Text>
                        <Text style={styles.secondText}>Hold on! you are about existing with out saving, are you sure?</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                            gap: 8
                        }}>
                            <TouchableOpacity style={styles.button} onPress={() => setModal(false)}>
                                <Text style={styles.buttonText}>Yes, close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#1A1A1A"}]} onPress={() => setModal(false)}>
                                <Text style={[styles.buttonText, {color: "#000000"}]}>No, cancel</Text>
                            </TouchableOpacity>
                        </View>




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
    },
    button: {
        width: "45%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#E53935",
        paddingVertical: 15,
        marginTop: 20,
      

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },

    modalContent: {
        position: 'absolute',
        bottom: height * 0.40,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 20,
        alignItems: "center",
        height: height * 0.35,
        paddingHorizontal: 20,
        marginHorizontal: 30,
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


export default ConfirmModal
