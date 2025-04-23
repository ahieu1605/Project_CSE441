import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
const welcome = () => {

    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
        </View>
    );
};

export default welcome;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.neutral900,
    },
    logo: {
        height: "20%",
        aspectRatio: 1,
    },
});