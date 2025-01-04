import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import PastQuestionTopicComponent from '../../components/PastQuestionTopicComponent';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const pastQuestionTopic = () => {
    const { topics, year } = useLocalSearchParams() || {};
    const searchResults = typeof topics === 'string' ? JSON.parse(topics) : [];
    const yearString = year ? year.toString() : '';

   
    const topicResults = searchResults.map((topic: any) => ({
        id: topic.id,
        title: topic.title,
        free: topic.free,
    }));


    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }}>

                <Text style={styles.firstText}>{topicResults.length} View all the topics here</Text>
                   {topicResults.map((result: any, index: any) => (
                    <PastQuestionTopicComponent
                        key={index}
                        id={result.id}
                        title={result.title}
                        free={result.free}
                        year={yearString}
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

export default pastQuestionTopic;
