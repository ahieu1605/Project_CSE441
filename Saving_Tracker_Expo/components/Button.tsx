import {StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import React from "react";
import {CustomButtonProps} from "@/types";
import {radius, colors} from "@/constants/theme";
import Loading from "./Loading";
import {verticalScale} from "@/utils/styling";

const Button = ({
                    style,
                    onPress,
                    loading = false,
                    children
                }: CustomButtonProps) => {
    if (loading) {
        return (
            <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
                <Loading/>
            </View>
        );
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {children}
        </TouchableOpacity>
    );
}
export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius._17,
        height: verticalScale(52),
        borderCurve: "continuous",
        justifyContent: "center",

    }
});