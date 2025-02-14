import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { WebView } from 'react-native-webview';

const pastQuestion = () => {
    const router = useRouter();
    const { content } = useLocalSearchParams();
    const searchResults = typeof content === 'string' ? JSON.parse(content) : [];

    const isSingleImage = typeof searchResults === 'string';
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }}>

               
                {isSingleImage ? (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image source={{ uri: `https://sbsapp.com.ng/${searchResults}` }} style={styles.image} />
                    </View>
                ) : (searchResults.map((result: any, index: number) => (
                    <View key={index} style={{ marginBottom: 20 }}>

                        <Text style={styles.firstText}>Year: {result.year}</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            {result.image_1 && <Image source={{ uri: `https://sbsapp.com.ng/${result.image_1}` }} style={styles.image} />}
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            {result.image_2 && <Image source={{ uri: `https://sbsapp.com.ng/${result.image_2}` }} style={styles.image} />}
                        </View>
                        {result.latex ? (
                                <WebView
                                    originWhitelist={['*']}
                                    source={{ html: createMathJaxScript(result.content) }}
                                    style={{ height: 1000 }}
                                    setSupportZoom={true}
                                    useWebKit={true}
                                    scalesPageToFit={true}
                                    javaScriptEnabled={true}

                                />
                            ) : (
                                <Markdown style={{
                                    text: {
                                        fontSize: 16,
                                        lineHeight: 24,
                                    }
                                }}>
                                    {result.content || ''}
                                </Markdown>
                            )}
                        

                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {result.image_3 && <Image source={{ uri: `https://sbsapp.com.ng/${result.image_3}` }} style={styles.image} />}
                            {result.image_4 && <Image source={{ uri: `https://sbsapp.com.ng/${result.image_4}` }} style={styles.image} />}
                            {result.image_5 && <Image source={{ uri: `https://sbsapp.com.ng/${result.image_5}` }} style={styles.image} />}
                        </View>
                    </View>
                )))}
            </ScrollView>
        </SafeAreaView>
    );
};

const createMathJaxScript = (content: any) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </head>
    <body>
    <div id="math"></div>
    <script>
        document.getElementById('math').innerHTML = \`${content.replace(/\\/g, '\\\\')}\`;
        MathJax.typeset();
    </script>
    </body>
    </html>
    `;
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 20,
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
        height: 500,
        marginTop: 10,

    },
});

export default pastQuestion;
