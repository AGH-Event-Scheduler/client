import React, { useEffect, useState } from "react";
import {
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

  const [pickingDate, setPickingDate] = useState<PickingDate>(PickingDate.NO);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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

  return (
    <ScrollView style={styles.container}>
      {backgroundImageUri ? (
        <View style={styles.imageUploadSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: backgroundImageUri }} />
          </View>
          <AppButton
            title="Update Image"
            onPress={onUploadImageButtonPress}
            type={"secondary"}
            size={"default"}
          />
        </View>
      ) : (
        <View style={styles.imageUploadSection}>
          <AppButton
            title="Upload Image"
            onPress={onUploadImageButtonPress}
            type={"primary"}
            size={"default"}
          />
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
          {"(Empty values are copied from other language by default)"}
        </Text>
        <TextInputContainer
          label="Name"
          placeholder="Provide event name in..."
          value={name[language]}
          onChangeText={(text) => {
            var value = { ...name };
            value[language] = text;
            setName(value);
          }}
          description=""
        />

        <TextInputContainer
          label="Description"
          placeholder="Provide event description..."
          value={description[language]}
          onChangeText={(text) => {
            var value = { ...description };
            value[language] = text;
            setDescription(value);
          }}
          description=""
          multiline={true}
        />

        <TextInputContainer
          label="Location"
          placeholder="Provide event location..."
          value={location[language]}
          onChangeText={(text) => {
            var value = { ...location };
            value[language] = text;
            setLocation(value);
          }}
          description=""
        />
      </View>
      <View style={styles.dateSection}>
        <View style={styles.dateField}>
          <Text style={styles.date}>
            {toBeautifiedDateTimeString(startDate)}
          </Text>
          <AppButton
            title="Set start date"
            onPress={() => {
              setPickingDate(PickingDate.StartDate);
            }}
            type={"primary"}
            size={"small"}
          />
        </View>

        <View style={styles.dateField}>
          <Text style={styles.date}>{toBeautifiedDateTimeString(endDate)}</Text>
          <AppButton
            title="Set end date"
            onPress={() => {
              setPickingDate(PickingDate.EndDate);
            }}
            type={"primary"}
            size={"small"}
          />
        </View>

        <DateTimePickerModal
          isVisible={pickingDate !== PickingDate.NO}
          mode="datetime"
          onConfirm={(date: Date) => {
            if (pickingDate === PickingDate.StartDate) {
              setStartDate(date);
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
          date={new Date()}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
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
});
