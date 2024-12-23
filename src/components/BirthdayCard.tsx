import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

interface BirthdayCardProps {
    name: string;
    image: string;
    note: string;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ name, image, note }) => {
    return (
        <View style={styles.outerContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.firstText}>Happy Birthday, {name}!🎉</Text>
            <Text style={styles.secondText}>{note}</Text>
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
    }
})

export default BirthdayCard
