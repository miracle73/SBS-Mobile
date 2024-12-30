import { View, Text, Dimensions, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ModalIcon from '../../../assets/images/Modal Icon.png'
import TouchableOutside from './TouchableOutside'
import { useRouter } from 'expo-router'



const { width, height } = Dimensions.get('window')
interface AddNotificationSuccessModalProps {
    setModal: (value: boolean) => void;
    modal: boolean;

}
const AddNotificationSuccessModal = ({ setModal, modal }: AddNotificationSuccessModalProps) => {
 const router = useRouter()
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

                        <Text style={styles.firstText}>Success</Text>
                        <Text style={styles.secondText}>Your notification has successfully been uploaded.</Text>


                        <TouchableOpacity style={styles.button} onPress={() => {router.replace("/admin/notification"); setModal(false)}}>
                            <Text style={styles.buttonText}>Close page</Text>
                        </TouchableOpacity>



                    </View>
                </View>
            </TouchableOutside>
        </Modal>
    )
}

const styles = StyleSheet.create({


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

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },

    modalContent: {
        marginHorizontal: 20,
        position: 'absolute',
        bottom: height * 0.30,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 20,
        alignItems: "center",
        height: height * 0.25,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    firstText: {
        fontSize: 14,
        fontWeight: "700",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 20,
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

export default AddNotificationSuccessModal
