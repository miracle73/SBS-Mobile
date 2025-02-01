import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import PastQuestionTopicComponent from '../../components/PastQuestionTopicComponent';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const pastQuestionTopic = () => {
    const { topics, year, level } = useLocalSearchParams() || {};
    const searchResults = typeof topics === 'string' ? JSON.parse(topics) : [];
    const yearString = year ? year.toString() : '';
    let levelString = typeof level  === 'string' ?  JSON.parse(level) : '';
    const levelNumber = parseInt(levelString);
    if ([1, 2, 3, 4, 5].includes(levelNumber)) {
        levelString = (levelNumber * 100).toString();
    }
   

    const topicResults = searchResults.map((topic: any) => ({
        id: topic.id,
        title: topic.title,
        free: topic.free,
        courseName: topic.courseName,
    }));


    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                {topicResults.length == 0 ?
                    <Text style={styles.firstText}> No past Question</Text> :
                    <Text style={styles.firstText}> View the {topicResults.length} pastQuestion  {topicResults.length == 1? "topic" : "topics"} here</Text>}

                {topicResults.map((result: any, index: any) => (
                    <PastQuestionTopicComponent
                        key={index}
                        id={result.id}
                        title={result.title}
                        free={result.free}
                        year={yearString}
                        courseName={result.courseName}
                        level={levelString}
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
