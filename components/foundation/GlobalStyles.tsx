import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    primaryButton: {
        backgroundColor: '#016531',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#016531",
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        color: '#016531',
        padding: 5,
        borderWidth: 2,
        borderColor: "#016531",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    secondaryButtonText: {
        color: '#016531',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
})