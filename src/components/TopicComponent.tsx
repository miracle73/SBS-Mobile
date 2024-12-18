import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SecondPadlockIcon } from '../../assets/svg';
import { useRouter } from 'expo-router';

interface TopicComponentProps {
    title: string;
    topics: number;
}


const TopicComponent: React.FC<TopicComponentProps> = ({ title, topics }) => {
    const router = useRouter();


    const handlePress = () => {
// /admin/adminhome/first/birthdays
        router.push(`/other/school`);
    };
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
                styles.Container,
                { backgroundColor: '#F8F8F8', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 20, marginBottom: 10 },
            ]}
        >

            <View>
                <Text style={styles.firstText}>{title}</Text>

                <Text style={styles.secondText}>Topic {topics}</Text>

            </View>
            <SecondPadlockIcon />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    RoundedContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    firstText: {
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        color: '#000000',
        marginBottom: 5
    },
    secondText: {
        fontSize: 10,
        fontWeight: '400',
        fontStyle: 'normal',
        color: '#000000',
    },
});

export default TopicComponent