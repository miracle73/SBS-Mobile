import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import SearchComponent from '../../components/SearchComponent';
import Picture from '../../../assets/images/searchpicture.png';
import NotificationImage from "../../../assets/images/NotificationImage.png"

const search = () => {
    const searchResults = [
        { image: Picture, title: 'Bio 101', topics: 10 },
        { image: Picture, title: 'Chemistry 201', topics: 15 },
        { image: Picture, title: 'Physics 301', topics: 8 },
    ];

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }} showsHorizontalScrollIndicator={false}>
                {searchResults.length > 0 ? (
                    <>
                        <Text style={styles.firstText}>60 search results </Text>
                        {searchResults.map((result, index) => (
                            <SearchComponent
                                key={index}
                                image={result.image}
                                title={result.title}
                                topics={result.topics}
                            />
                        ))}
                    </>
                ) : (
                    <View >
                        <Text style={styles.secondText}>Get all the results to every note you search for</Text>
                        <View style={styles.noResultsContainer}>
                            <Image source={NotificationImage} style={styles.image} />
                            <Text style={styles.noResultsText}>
                                You’re all caught up! No new notifications.
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    firstText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '400',
        marginBottom: 5,
    },
    secondText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 150,
    },
    noResultsContainer: {

        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',

    },
});

export default search;
