import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { WebView } from 'react-native-webview';



const note = () => {
    const [note, setNote] = useState("");
    const router = useRouter();
    const { content } = useLocalSearchParams();

    const searchResults = typeof content === 'string' ? JSON.parse(content) : content;
    const isSingleImage = typeof searchResults === 'string';
    const mathJaxScript = `
<!DOCTYPE html>
<html>
<head>
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
<body>
<div id="math"></div>
<script>
  document.getElementById('math').innerHTML = \`
  ${searchResults.content.replace(/\\/g, '\\\\')}
  \`;
  MathJax.typeset();
</script>
</body>
</html>
`;

    if (isSingleImage) {
        console.log(4)
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image source={{ uri: `https://sbsapp.com.ng/${searchResults}` }} style={styles.image} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {searchResults.image_1 && <Image source={{ uri: `https://sbsapp.com.ng/${searchResults.image_1}` }} style={styles.image} />}
                </View>
                <Text style={styles.firstText}>{searchResults.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {searchResults.image_2 && <Image source={{ uri: `https://sbsapp.com.ng/${searchResults.image_2}` }} style={styles.image} />}
                </View>
                <Markdown style={{
                    text: {
                        fontSize: 16,
                        lineHeight: 24,
                    }
                }}>
                    {searchResults.content || 'No content available'}
                </Markdown>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: mathJaxScript }}
                    style={{ height: 1000 }}
                />
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    {searchResults.image_3 && <Image source={{ uri: `https://sbsapp.com.ng/${searchResults.image_3}` }} style={styles.image} />}
                    {searchResults.image_4 && <Image source={{ uri: `https://sbsapp.com.ng/${searchResults.image_4}` }} style={styles.image} />}
                    {searchResults.image_5 && <Image source={{ uri: `https://sbsapp.com.ng/${searchResults.image_5}` }} style={styles.image} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    bodyContainer: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    markdown: {

    },
    firstText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginVertical: 5,
        marginTop: 10,
        textAlign: "center"
    },
    secondText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 500,
        marginTop: 10,
    },
    thirdText: {
        fontSize: 10,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
    },
    fourthText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '400',
        marginBottom: 5,
        marginTop: 20
    },
    fifthText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 5,
    },
    pickerContainer: {
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        marginTop: 20,
        width: "45%"

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        color: '#000000',
        paddingRight: 30,
        alignSelf: 'stretch',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        color: '#000000',
        paddingRight: 30,
        alignSelf: 'stretch',
    },
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default note;
