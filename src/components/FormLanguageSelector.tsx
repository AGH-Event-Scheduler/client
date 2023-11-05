import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { AppButton, ButtonSize } from "./AppButton";
import { LoadingView } from "./loading/LoadingView";
import { Language, getImageUrl } from "../api/api-utils";
import { useTranslation } from "react-i18next";
import CountryFlag from "react-native-country-flag";

interface FormLanguageSelectorProps {
  onLanguageChange: (language: Language) => void;
}

export const FormLanguageSelector = ({
  onLanguageChange,
}: FormLanguageSelectorProps) => {
  const { t, i18n } = useTranslation();

  const [currentFormLanguage, setCurrentFormLanguage] = useState<Language>(
    i18n.language === "pl" ? Language.PL : Language.ENG,
  );

  useEffect(() => {
    onLanguageChange(currentFormLanguage);
  }, [currentFormLanguage]);

  return (
    <View style={styles.languageSelect}>
      <TouchableOpacity
        style={styles.flagContainer}
        onPress={() => {
          setCurrentFormLanguage(Language.PL);
        }}
      >
        <CountryFlag
          isoCode="pl"
          size={currentFormLanguage === Language.PL ? 32 : 23}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.flagContainer}
        onPress={() => {
          setCurrentFormLanguage(Language.ENG);
        }}
      >
        <CountryFlag
          isoCode="gb"
          size={currentFormLanguage === Language.ENG ? 32 : 23}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  languageSelect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  flagContainer: {
    borderWidth: 1,
    flex: 0,
  },
});