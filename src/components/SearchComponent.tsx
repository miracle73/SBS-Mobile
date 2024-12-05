import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import React from 'react';
import { BooksIcon } from '../../assets/svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Define the type for the component props
interface SearchComponentProps {
    image: ImageSourcePropType;
    title: string;
    topics: number;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ image, title, topics }) => {
    const router = useRouter(); // Hook for navigation

    // Handle navigation when the SearchComponent is clicked
    const handlePress = () => {
        // Navigate to the topics screen, passing the title as a parameter
        router.push(`/other/topics?title=${title}`);
    };
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
                styles.Container,
                { backgroundColor: '#F8F8F8', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 20, marginBottom: 10 },
            ]}
        >
            <View style={{ width: '25%' }}>
                <View style={styles.RoundedContainer}>
                    <Image source={image} style={{ width: 50, height: 50, borderRadius: 25 }} />
                </View>
            </View>
            <View style={[styles.Container, { width: '75%' }]}>
                <View>
                    <Text style={styles.firstText}>{title}</Text>
                    <View style={[styles.Container, { justifyContent: 'flex-start', gap: 4 }]}>
                        <BooksIcon />
                        <Text style={styles.secondText}>{topics} topics</Text>
                    </View>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
            </View>
        </TouchableOpacity>
    );
};

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
    },
    secondText: {
        fontSize: 10,
        fontWeight: '400',
        fontStyle: 'normal',
        color: '#000000',
    },
});

export default SearchComponent;
