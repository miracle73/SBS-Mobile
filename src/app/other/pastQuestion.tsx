import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

const pastQuestion = () => {
    const router = useRouter();
    const { content } = useLocalSearchParams();
    const searchResults = typeof content === 'string' ? JSON.parse(content) : [];

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                {searchResults.map((result: any, index: number) => (
                    <View key={index} style={styles.questionContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            {result.image_1 && <Image source={{ uri: result.image_1 }} style={styles.image} />}
                        </View>
                        <Text style={styles.firstText}>Year: {result.year}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            {result.image_2 && <Image source={{ uri: result.image_2 }} style={styles.image} />}
                        </View>
                        <Text style={styles.secondText}>{result.content}</Text>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {result.image_3 && <Image source={{ uri: result.image_3 }} style={styles.image} />}
                            {result.image_4 && <Image source={{ uri: result.image_4 }} style={styles.image} />}
                            {result.image_5 && <Image source={{ uri: result.image_5 }} style={styles.image} />}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    questionContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
    },
    firstText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 5,
        textAlign: "center"
    },
    secondText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10,
    },
});

export default pastQuestion;
