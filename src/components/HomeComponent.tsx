import React, { FC } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface HomeComponentProps {
    Icon?: React.ComponentType; // Type for a React component passed as a prop
    firstText: string;          // Type for the first text prop
    secondText: string;         // Type for the second text prop
    backgroundColor?: string;   // Optional background color prop
    disabled?: boolean; // New disabled prop
}

const HomeComponent: FC<HomeComponentProps> = ({ 
    Icon, 
    firstText, 
    secondText, 
    backgroundColor = "#E53935" ,
    disabled = false 
}) => {
    return (
        <View 
        style={[
            styles.container, 
            { backgroundColor: disabled ? "#B0BEC5" : backgroundColor, opacity: disabled ? 0.5 : 1 }
        ]}>
            <View style={styles.iconContainer}>
                <View style={styles.iconWrapper}>
                    {Icon && <Icon />}
                </View>
                <Text style={styles.firstText}>{firstText}</Text>
            </View>
            <Text style={styles.secondText}>{secondText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 10,
        height: 80,
        justifyContent: "center",
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 4,
        marginBottom: 5,
    },
    iconWrapper: {
        height: 16,
        width: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    firstText: {
        fontSize: 10,
        color: "#303030",
        fontWeight: "700",
    },
    secondText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#303030",
    },
});

export default HomeComponent;
