import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import FirstImage from '../../assets/images/Thumbnail-2.png'

interface CourseCardProps {

    course: any;

}

const CourseCard : React.FC<CourseCardProps> = ({ course }) => {
    return (
        <View style={styles.outerContainer}>
            <Image source={FirstImage} style={{padding: 5}} />
            <Text style={styles.firstText}>{course.title}</Text>
            <Text style={styles.secondText}>{course.course_id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        height: 150,
        backgroundColor: "#FEF7FF",
        padding: 8,
        marginVertical: 7,
        justifyContent: "space-between",
        opacity: 0.7
        
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