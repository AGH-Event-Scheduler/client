import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { FormDataFileUpload } from "../../api/api-utils";
import { Language, MultiLanguageText } from "../../api/types";
import { createOrganization } from "../../api/organization-api-utils";
import { LoadingView } from "../../components/loading/LoadingView";
import { AppButton } from "../../components/AppButton";
import { FormLanguageSelector } from "../../components/FormLanguageSelector";
import { TextInputContainer } from "../../components/TextInputContainer";
import { Feather } from "@expo/vector-icons";
import {
  Field,
  useCreateOrganizationFormValidation,
} from "./useCreateOrganizationFormValidation";
import { FormError } from "../../components/FormError";
import { getFormDataFileUpload } from "../../utils/image-utils";
import { globalStyles } from "../../styles/GlobalStyles";
import { resetToRouteName } from "../../components/navigation/bottom/BottomNavBar";

export const CreateOrganizationView = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  const [backgroundImage, setBackgroundImageUri] =
    useState<FormDataFileUpload>(null);

  const [logoImage, setLogoImageUri] = useState<FormDataFileUpload>(null);

  const [currentFormLanguage, setCurrentFormLanguage] = useState<Language>(
    i18n.language === "pl" ? Language.PL : Language.EN,
  );
  const [name, setName] = useState<MultiLanguageText>({ PL: "", EN: "" });
  const [description, setDescription] = useState<MultiLanguageText>({
    PL: "",
    EN: "",
  });

  const [leaderEmail, setLeaderEmail] = useState<string>("");

  const { errors, runCreateValidators, runUpdateValidators } =
    useCreateOrganizationFormValidation();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onUploadBackgroundImageButtonPress = async () => {
    setBackgroundImageUri(await getFormDataFileUpload());
  };

  const onUploadLogoImageButtonPress = async () => {
    setLogoImageUri(await getFormDataFileUpload());
  };

  const submitForm = async () => {
    const validators = await runCreateValidators(
      backgroundImage,
      logoImage,
      name,
      description,
      leaderEmail,
    );
    if (validators) {
      setIsLoading(true);
      try {
        const organization = await createOrganization(
          name,
          description,
          backgroundImage,
          logoImage,
          leaderEmail,
        );

        setIsLoading(false);

        if (organization) {
          navigation.replace("Organization", {
            organizationId: organization.id,
          });
        }
      } catch (e) {
        setIsLoading(false);
      }
    }
  };
  const cancelForm = () => {
    resetToRouteName(navigation, "Home");
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <ScrollView style={styles.container}>
          {backgroundImage ? (
            <View>
              <Text style={globalStyles.descriptionTitle}>
                {t("create-organization.background-image")}
              </Text>
              <TouchableOpacity
                onPress={onUploadBackgroundImageButtonPress}
                style={[
                  styles.imageEditSection,
                  styles.backgroundImageEditSection,
                ]}
              >
                <View
                  style={[
                    styles.imageContainer,
                    styles.backgroundImageContainer,
                  ]}
                >
                  <Image
                    style={[styles.image, styles.backgroundImage]}
                    source={{ uri: backgroundImage.uri }}
                  />
                </View>
                <Feather name={"edit"} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.descriptionTitle}>
                {t("create-organization.background-image")}
              </Text>
              <TouchableOpacity
                onPress={onUploadBackgroundImageButtonPress}
                style={[
                  styles.imageUploadSection,
                  styles.backgroundImageUploadSection,
                ]}
              >
                <Feather name={"upload"} style={styles.uploadIcon} />
              </TouchableOpacity>
              {Field.BGIMG in errors ? (
                <FormError errorText={errors[Field.BGIMG]} />
              ) : null}
            </View>
          )}

          {logoImage ? (
            <View>
              <Text style={globalStyles.descriptionTitle}>
                {t("create-organization.logo-image")}
              </Text>
              <TouchableOpacity
                onPress={onUploadLogoImageButtonPress}
                style={[styles.imageEditSection, styles.logoImageEditSection]}
              >
                <View
                  style={[styles.imageContainer, styles.logoImageContainer]}
                >
                  <Image
                    style={[styles.image, styles.logoImage]}
                    source={{ uri: logoImage.uri }}
                  />
                </View>
                <Feather name={"edit"} style={styles.logoEditIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.descriptionTitle}>
                {t("create-organization.logo-image")}
              </Text>
              <TouchableOpacity
                onPress={onUploadLogoImageButtonPress}
                style={[
                  styles.imageUploadSection,
                  styles.logoImageUploadSection,
                ]}
              >
                <Feather name={"upload"} style={styles.logoUploadIcon} />
              </TouchableOpacity>
              {Field.LOGO in errors ? (
                <FormError errorText={errors[Field.LOGO]} />
              ) : null}
            </View>
          )}

          <View style={styles.textSection}>
            <FormLanguageSelector
              onLanguageChange={(language) => {
                setCurrentFormLanguage(language);
              }}
            />
            <Text style={{ textAlign: "center" }}>
              {t("create-organization.at-least-one-translation-required-info")}
            </Text>
            <TextInputContainer
              label={t("create-organization.name-label")}
              placeholder={t("create-organization.enter-organization-name")}
              value={name[currentFormLanguage]}
              onChangeText={(text) => {
                var value = { ...name };
                value[currentFormLanguage] = text;
                setName(value);
              }}
              description=""
              error={Field.NAME in errors}
              errorText={errors[Field.NAME]}
            />

            <TextInputContainer
              label={t("create-organization.description-label")}
              placeholder={t(
                "create-organization.enter-organization-description",
              )}
              value={description[currentFormLanguage]}
              onChangeText={(text) => {
                var value = { ...description };
                value[currentFormLanguage] = text;
                setDescription(value);
              }}
              description=""
              multiline={true}
              error={Field.DESCRIPTION in errors}
              errorText={errors[Field.DESCRIPTION]}
            />

            <TextInputContainer
              label={t("create-organization.leader-label")}
              placeholder={t("create-organization.enter-leader-email")}
              value={leaderEmail}
              onChangeText={(text) => {
                setLeaderEmail(text);
              }}
              description=""
              multiline={false}
              error={Field.LEADER in errors}
              errorText={errors[Field.LEADER]}
            />
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title={t("general.create")}
              onPress={submitForm}
              type={"primary"}
              size={"default"}
            />
            <AppButton
              title={t("general.cancel")}
              onPress={cancelForm}
              type={"secondary"}
              size={"default"}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
  },
  imageUploadSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    borderStyle: "dotted",
    borderColor: "green",
    borderWidth: 3,
  },
  backgroundImageUploadSection: {
    width: "100%",
    height: 200,
  },
  logoImageUploadSection: {
    width: "30%",
    height: 100,
  },
  uploadIcon: {
    fontSize: 64,
    color: "green",
  },
  logoUploadIcon: {
    fontSize: 32,
    color: "green",
  },
  editIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 48,
    color: "#7F7F7F",
  },
  logoEditIcon: {
    position: "absolute",
    top: 0,
    right: -48,
    fontSize: 32,
    color: "#7F7F7F",
  },
  imageEditSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  backgroundImageEditSection: {
    width: "100%",
    height: 200,
  },
  logoImageEditSection: {
    width: "30%",
    height: 100,
  },
  imageContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  backgroundImageContainer: {
    width: "100%",
    height: 200,
  },
  logoImageContainer: {
    width: "100%",
    height: 100,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImage: {
    maxHeight: 200,
  },
  logoImage: {
    maxHeight: 100,
  },
  textSection: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 30,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});
