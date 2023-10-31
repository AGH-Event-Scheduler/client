import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventDetails } from "../../api/event-api-utils";
import { OrganizationEvent } from "../../api/types";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import { toBeautifiedDateTimeString } from "../../utils/date";
import { LoadingView } from "../../components/loading/LoadingView";
import * as ImagePicker from "expo-image-picker";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CountryFlag from "react-native-country-flag";
import { FormError } from "../../components/FormError";

enum Language {
  PL = "pl",
  ENG = "eng",
}

enum PickingDate {
  StartDate,
  EndDate,
  NO,
}

type TranslatableTextInput = {
  [language in Language]: string;
};

enum Field {
  IMAGE = "img",
  NAME = "name",
  DESCRIPTION = "dsc",
  LOCATION = "loc",
  DATE = "date",
}

export const CreateEventScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [backgroundImageUri, setBackgroundImageUri] = useState(null);

  const [language, setLanguage] = useState<Language>(
    i18n.language === "pl" ? Language.PL : Language.ENG,
  );
  const [name, setName] = useState<TranslatableTextInput>({ pl: "", eng: "" });
  const [description, setDescription] = useState<TranslatableTextInput>({
    pl: "",
    eng: "",
  });
  const [location, setLocation] = useState<TranslatableTextInput>({
    pl: "",
    eng: "",
  });

  const beginStartDate = new Date();
  const beginEndDate = new Date(beginStartDate);
  beginEndDate.setHours(beginEndDate.getHours() + 1);
  const [pickingDate, setPickingDate] = useState<PickingDate>(PickingDate.NO);
  const [startDate, setStartDate] = useState<Date>(beginStartDate);
  const [endDate, setEndDate] = useState<Date>(beginEndDate);

  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  // const organizationId = route.params.organizationId;

  const onUploadImageButtonPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result.assets[0].uri);
    setBackgroundImageUri(result.assets[0].uri);
  };

  const submitForm = () => {
    if (runValidators()) {
      console.log("Form submitted successfully");
    } else {
      Alert.alert(t("create-event.validation-failed-error"));
    }
  };

  const runValidators = () => {
    var newErrors = {};
    const validatorResults = [
      validateImage(Field.IMAGE, backgroundImageUri, newErrors),
      validateTextField(Field.NAME, name, newErrors),
      validateTextField(Field.DESCRIPTION, description, newErrors),
      validateTextField(Field.LOCATION, location, newErrors),
      validateDate(Field.DATE, startDate, endDate, newErrors),
    ];
    setErrors(newErrors);

    return validatorResults.every((e) => e);
  };

  const validateImage = (field: Field, backgroundImageUri: string, errors) => {
    if (!backgroundImageUri) {
      errors[field] = t("create-event.background-image-required-error");
      return false;
    }
    return true;
  };

  const validateTextField = (
    field: Field,
    state: TranslatableTextInput,
    errors,
  ) => {
    if (!/\S/.test(state[Language.PL]) && !/\S/.test(state[Language.ENG])) {
      errors[field] = t("create-event.at-least-one-translation-required-error");
      return false;
    }
    return true;
  };

  const validateDate = (
    field: Field,
    startDate: Date,
    endDate: Date,
    errors,
  ) => {
    if (startDate.valueOf() >= endDate.valueOf()) {
      errors[field] = t("create-event.start-date-not-vefore-end-date-error");
      return false;
    }
    return true;
  };

  return (
    <ScrollView style={styles.container}>
      {backgroundImageUri ? (
        <View style={styles.imageUploadSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: backgroundImageUri }} />
          </View>
          <AppButton
            title={t("create-event.update-image")}
            onPress={onUploadImageButtonPress}
            type={"secondary"}
            size={"default"}
          />
        </View>
      ) : (
        <View style={styles.imageUploadSection}>
          <View
            style={[styles.imageContainer, { backgroundColor: "#FAFAFA" }]}
          ></View>
          <AppButton
            title={t("create-event.upload-image")}
            onPress={onUploadImageButtonPress}
            type={"primary"}
            size={"default"}
          />
          {Field.IMAGE in errors ? (
            <FormError
              errorText={errors[Field.IMAGE]}
              style={{ marginTop: 5 }}
            />
          ) : null}
        </View>
      )}

      <View style={styles.textSection}>
        <View style={styles.languageSelect}>
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={() => {
              setLanguage(Language.PL);
            }}
          >
            <CountryFlag
              isoCode="pl"
              size={language === Language.PL ? 32 : 23}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={() => {
              setLanguage(Language.ENG);
            }}
          >
            <CountryFlag
              isoCode="gb"
              size={language === Language.ENG ? 32 : 23}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center" }}>
          {t("create-event.at-least-one-translation-required-info")}
        </Text>
        <TextInputContainer
          label={t("create-event.name-label")}
          placeholder={t("create-event.provide-event-name")}
          value={name[language]}
          onChangeText={(text) => {
            var value = { ...name };
            value[language] = text;
            setName(value);
          }}
          description=""
          error={Field.NAME in errors}
          errorText={errors[Field.NAME]}
        />

        <TextInputContainer
          label={t("create-event.description-label")}
          placeholder={t("create-event.provide-event-description")}
          value={description[language]}
          onChangeText={(text) => {
            var value = { ...description };
            value[language] = text;
            setDescription(value);
          }}
          description=""
          multiline={true}
          error={Field.DESCRIPTION in errors}
          errorText={errors[Field.DESCRIPTION]}
        />

        <TextInputContainer
          label={t("create-event.location-label")}
          placeholder={t("create-event.provide-event-location")}
          value={location[language]}
          onChangeText={(text) => {
            var value = { ...location };
            value[language] = text;
            setLocation(value);
          }}
          description=""
          error={Field.LOCATION in errors}
          errorText={errors[Field.LOCATION]}
        />
      </View>
      <View style={[styles.dateSection]}>
        <View
          style={[
            styles.dateSectionDates,
            Field.DATE in errors ? styles.inputError : null,
          ]}
        >
          <View style={styles.dateField}>
            <Text style={globalStyles.descriptionTitle}>
              {t("create-event.start-date-label")}
            </Text>
            <Text style={styles.date}>
              {toBeautifiedDateTimeString(startDate, i18n.language)}
            </Text>
            <AppButton
              title={t("create-event.set-start-date")}
              onPress={() => {
                setPickingDate(PickingDate.StartDate);
              }}
              type={"primary"}
              size={"small"}
            />
          </View>

          <View style={styles.dateField}>
            <Text style={globalStyles.descriptionTitle}>
              {t("create-event.end-date-label")}
            </Text>
            <Text style={styles.date}>
              {toBeautifiedDateTimeString(endDate, i18n.language)}
            </Text>
            <AppButton
              title={t("create-event.set-end-date")}
              onPress={() => {
                setPickingDate(PickingDate.EndDate);
              }}
              type={"primary"}
              size={"small"}
            />
          </View>
        </View>
        {Field.DATE in errors ? (
          <FormError
            errorText={errors[Field.DATE]}
            style={{ alignSelf: "center" }}
          />
        ) : null}

        <DateTimePickerModal
          isVisible={pickingDate !== PickingDate.NO}
          mode="datetime"
          onConfirm={(date: Date) => {
            if (pickingDate === PickingDate.StartDate) {
              const dateDiff = endDate.valueOf() - startDate.valueOf();
              const newEndDate = new Date(date.valueOf() + dateDiff);
              setStartDate(date);
              setEndDate(newEndDate);
              setPickingDate(PickingDate.NO);
            } else if (pickingDate === PickingDate.EndDate) {
              setEndDate(date);
              setPickingDate(PickingDate.NO);
            }
          }}
          onCancel={() => {
            setPickingDate(PickingDate.NO);
          }}
          locale={i18n.language}
          date={
            pickingDate === PickingDate.StartDate
              ? startDate
              : pickingDate === PickingDate.EndDate
              ? endDate
              : new Date()
          }
        />
      </View>

      <View style={styles.submitContainer}>
        <AppButton
          title={t("create-event.submit")}
          onPress={submitForm}
          type={"primary"}
          size={"default"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
  },
  imageUploadSection: {
    marginBottom: 30,
    marginTop: 10,
  },
  imageContainer: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    maxHeight: 200,
  },
  textSection: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 30,
  },
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
  dateSection: {
    marginBottom: 30,
    gap: 5,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
  },
  dateSectionDates: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  date: {
    color: "#016531",
    fontWeight: "bold",
  },
  dateField: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  submitContainer: {
    marginBottom: 30,
  },
});
