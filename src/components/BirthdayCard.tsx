import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

interface BirthdayCardProps {
    name: string;
    image: string;
    note: string;
    department: string;
    level: string;
    school: string;
    dob: string;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ name, image, note, department, level, school, dob }) => {
    const fullImageUrl = `https://sbsapp.com.ng/${image}`;
    return (
        <View style={styles.outerContainer}>
            <Image source={{ uri: fullImageUrl }} style={styles.image} />
            <Text style={styles.firstText}>Happy Birthday, {name}!🎉</Text>
            <Text style={styles.secondText}>School: {school}</Text>
            <Text style={styles.secondText}>Department: {department}</Text>
            <Text style={styles.secondText}>Level: {level}</Text>
            <Text style={styles.secondText}>DOB: {dob}</Text>
            <Text style={styles.secondText}>{note}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        height: 300,
        backgroundColor: "#F8F8F8",
        padding: 8,
        marginVertical: 7,
        justifyContent: "space-between",
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: 80,
        resizeMode: 'cover',
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
    },
    thirdText: {
        fontSize: 10,
        fontWeight: '400',
        color: '#000000',
    }
});

export default BirthdayCard;
