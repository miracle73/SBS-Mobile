import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import BirthdayImage from '../../assets/images/birthdayImage.png'

const BirthdayCard = () => {
    return (
        <View style={styles.outerContainer}>
            <Image source={BirthdayImage} />
            <Text style={styles.firstText}>Happy Birthday, John!🎉</Text>
            <Text style={styles.secondText}>Learn more about equations each and every day.
                blahblahabfygigeyhdgbdkuthdgfbsnfh</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        height: 180,
        backgroundColor: "#F8F8F8",
        padding: 8,
        marginVertical: 7,
        justifyContent: "space-between",
        
    },
    firstText: {
     
        fontSize: 14,
        fontWeight: '400',
        color: '#000000',
    },
    secondText: {
       
        fontSize: 8,
        fontWeight: '400',
        color: '#000000',
    }
})

export default BirthdayCard