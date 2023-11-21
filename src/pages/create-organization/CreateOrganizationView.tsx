import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { FormDataFileUpload } from "../../api/api-utils";
import * as mime from "react-native-mime-types";
import {
  Language,
  MultiLanguageText,
} from "../../api/types";
import { createOrganization } from "../../api/organization-api-utils";
import { LoadingView } from "../../components/loading/LoadingView";
import { AppButton } from "../../components/AppButton";
import { FormLanguageSelector } from "../../components/FormLanguageSelector";
import { TextInputContainer } from "../../components/TextInputContainer";


export const CreateOrganizationView = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  
  const [isLoading, setIsLoading] = useState(true);

  const [backgroundImage, setBackgroundImageUri] =
    useState<FormDataFileUpload>(null);

  const [logoImage, setLogoImageUri] =
    useState<FormDataFileUpload>(null);

  const [currentFormLanguage, setCurrentFormLanguage] = useState<Language>(
    i18n.language === "pl" ? Language.PL : Language.EN,
  );
  const [name, setName] = useState<MultiLanguageText>({ PL: "", EN: "" });
  const [description, setDescription] = useState<MultiLanguageText>({
    PL: "",
    EN: "",
  });

  const [leaderEmail, setLeaderEmail] = useState<string>("")

  useEffect(() => {
      setIsLoading(false);
  }, []);

  const onUploadImageButtonPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    const asset = result.assets[0];

    const uri = asset.uri;
    const type = mime.lookup(asset.uri);
    if (!type || !mime.extension(type)) {
      return;
    }
    const name = `image.${mime.extension(type)}`;

    setBackgroundImageUri({
      type: type,
      uri: uri,
      name: name,
    });
  };

  const submitForm = async () => {
      setIsLoading(true);
      try {
        await createOrganization(
          name,
          description,
          backgroundImage,
          logoImage,
          leaderEmail
        ).then((result) => {
          setIsLoading(false);
          navigation.replace("Organization", { organizationId: result.id });
        });
      } catch (e) {
        setIsLoading(false);
        Alert.alert(e);
      }
    }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.imageUploadSection}>
              <View style={styles.imageContainer}>
              {/* <Image
                  style={styles.image}
                  source={{ uri: backgroundImage.uri }}
              /> */}
              </View>
              <AppButton
              title={t("create-event.update-image")}
              onPress={onUploadImageButtonPress}
              type={"secondary"}
              size={"default"}
              />
          </View>

          <View style={styles.textSection}>
            <FormLanguageSelector
              onLanguageChange={(language) => {
                setCurrentFormLanguage(language);
              }}
            />
            <Text style={{ textAlign: "center" }}>
              {t("create-event.at-least-one-translation-required-info")}
            </Text>
            <TextInputContainer
              label={t("create-event.name-label")}
              placeholder={t("create-event.provide-event-name")}
              value={name[currentFormLanguage]}
              onChangeText={(text) => {
                var value = { ...name };
                value[currentFormLanguage] = text;
                setName(value);
              }}
              description=""
            />

            <TextInputContainer
              label={t("create-event.description-label")}
              placeholder={t("create-event.provide-event-description")}
              value={description[currentFormLanguage]}
              onChangeText={(text) => {
                var value = { ...description };
                value[currentFormLanguage] = text;
                setDescription(value);
              }}
              description=""
              multiline={true}
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
      )}
    </View>
  )
}
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
