import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import TopicComponent from '../../components/TopicComponent';

const topics = () => {
    const topicResults = [
        { title: 'Concept of human life', topics: 1 },
        { title: 'Concept of human life', topics: 1 },
        { title: 'Concept of human life', topics: 1 },
        { title: 'Concept of human life', topics: 1 },
        { title: 'Concept of human life', topics: 1 },

    ];

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }}>

                <Text style={styles.firstText}>{topicResults.length} View all the topics here</Text>
                {topicResults.map((result, index) => (
                    <TopicComponent
                        key={index}
                        title={result.title}
                        topics={result.topics}
                    />
                ))}

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

export default topics;
