import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const index = () => {
    const rounter = useRouter();
    useEffect(() => {
        setTimeout(() => {
            rounter.push("/(auth)/welcome");
        }, 2000);
    }, []);


    return (
        <View style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={require("../assets/images/splashImage.png")} />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral900,
    },
    logo: {
        height: "20%",
        aspectRatio: 1
    }
});