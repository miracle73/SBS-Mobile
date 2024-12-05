import { View, Text, Dimensions, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ModalIcon from '../../../assets/images/Modal Icon.png'
import TouchableOutside from './TouchableOutside'



const { width, height } = Dimensions.get('window')
interface SubscriptionModalProps {
    setModal: (value: boolean) => void;
    modal: boolean;

}
const SubscriptionModal = ({ setModal, modal }: SubscriptionModalProps) => {

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

                        <Image source={ModalIcon} />
                        <Text style={styles.firstText}>Oops!</Text>
                        <Text style={styles.secondText}>Looks like you haven’t activated your subscription yet. Enter your pin to explore all features!</Text>


                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Activate Now</Text>
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

export default SubscriptionModal
