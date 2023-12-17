import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { globalStyles } from "../../styles/GlobalStyles"
import { useTranslation } from "react-i18next"

export const InfoView = () => {
    const { t } = useTranslation();
    return (
        <View style={{flex: 1,  gap: 5, backgroundColor: "white"}}>
            <Text style={[globalStyles.boldText, styles.text]}>{t("information.app-developed-by")}</Text>
            <Text style={styles.text} selectable>https://github.com/kBlazewicz</Text>
            <Text style={styles.text} selectable>https://github.com/rafibz007</Text>
            <Text style={styles.text} selectable>https://github.com/fkitka</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center", 
        textAlignVertical: "center"
    }
})