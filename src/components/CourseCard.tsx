import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import FirstImage from '../../assets/images/Thumbnail-2.png'

const CourseCard = () => {
    return (
        <View style={styles.outerContainer}>
            <Image source={FirstImage} style={{padding: 5}} />
            <Text style={styles.firstText}>ELECTROMAGNETISM</Text>
            <Text style={styles.secondText}>PHY 102</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        height: 180,
        backgroundColor: "#FEF7FF",
        padding: 8,
        marginVertical: 7,
        justifyContent: "space-between",
        
    },
    firstText: {
     
        fontSize: 12,
        fontWeight: '700',
        color: '#1D1B20',
    },
    secondText: {
       
        fontSize: 12,
        fontWeight: '400',
        color: '#1D1B20',
    }
})

export default CourseCard