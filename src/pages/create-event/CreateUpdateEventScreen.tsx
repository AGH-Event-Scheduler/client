import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createEvent,
  fetchFullEventDetails,
  updateEvent,
} from "../../api/event-api-utils";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import { toBeautifiedDateTimeString } from "../../utils/date";
import { LoadingView } from "../../components/loading/LoadingView";
import * as ImagePicker from "expo-image-picker";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FormError } from "../../components/FormError";
import { FormDataFileUpload } from "../../api/api-utils";
import * as mime from "react-native-mime-types";
import { FormLanguageSelector } from "../../components/FormLanguageSelector";
import {
  Field,
  useCreateUpdateEventFormValidation,
} from "./useCreateUpdateEventFormValidation";
import {
  FullOrganizationEvent,
  Language,
  MultiLanguageText,
} from "../../api/types";
import { EventHubImage } from "../../components/EventHubImage";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollViewComponent } from "../../components/KeyboardAwareScrollViewComponent";
import { resetToRouteName } from "../../components/navigation/bottom/BottomNavBar";

enum PickingDate {
  StartDate,
  EndDate,
  NO,
}

export const CreateUpdateEventScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const { errors, runCreateValidators, runUpdateValidators } =
    useCreateUpdateEventFormValidation();
  const [isLoading, setIsLoading] = useState(true);

  const [backgroundImage, setBackgroundImageUri] =
    useState<FormDataFileUpload>(null);

  const [currentFormLanguage, setCurrentFormLanguage] = useState<Language>(
    i18n.language === "pl" ? Language.PL : Language.EN,
  );
  const [name, setName] = useState<MultiLanguageText>({ PL: "", EN: "" });
  const [description, setDescription] = useState<MultiLanguageText>({
    PL: "",
    EN: "",
  });
  const [location, setLocation] = useState<MultiLanguageText>({
    PL: "",
    EN: "",
  });

  const beginStartDate = new Date();
  beginStartDate.setHours(beginStartDate.getHours() + 1);
  const beginEndDate = new Date(beginStartDate);
  beginEndDate.setHours(beginEndDate.getHours() + 1);
  const [pickingDate, setPickingDate] = useState<PickingDate>(PickingDate.NO);
  const [startDate, setStartDate] = useState<Date>(beginStartDate);
  const [endDate, setEndDate] = useState<Date>(beginEndDate);

  const organizationId = route.params?.organizationId;
  const editingEventId = route.params?.editingEventId;

  const [editingEvent, setEditingEvent] = useState<FullOrganizationEvent>(null);

  useEffect(() => {
    const setFormStateToEditingEvent = async (eventId: number) => {
      const editingEventResponse = await fetchFullEventDetails(eventId);

      setName(editingEventResponse.nameMap);
      setDescription(editingEventResponse.descriptionMap);
      setLocation(editingEventResponse.locationMap);
      setStartDate(new Date(editingEventResponse.startDate));
      setEndDate(new Date(editingEventResponse.endDate));
      setEditingEvent(editingEventResponse);

      setIsLoading(false);
    };

    if (editingEventId) {
      setFormStateToEditingEvent(editingEventId);
    } else {
      setIsLoading(false);
    }
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
    if (
      !editingEventId &&
      runCreateValidators(
        backgroundImage,
        name,
        description,
        location,
        startDate,
        endDate,
      )
    ) {
      setIsLoading(true);
      try {
        await createEvent(
          organizationId,
          name,
          description,
          location,
          startDate,
          endDate,
          backgroundImage,
        ).then((result) => {
          setIsLoading(false);
          navigation.replace("Event", { eventId: result.id });
        });
      } catch (e) {
        setIsLoading(false);
        Alert.alert(e);
      }
    } else if (
      editingEventId &&
      runUpdateValidators(name, description, location, startDate, endDate)
    ) {
      setIsLoading(true);
      try {
        await updateEvent(
          editingEventId,
          name,
          description,
          location,
          startDate,
          endDate,
          backgroundImage,
        ).then((result) => {
          setIsLoading(false);
          navigation.replace("Event", { eventId: result.id });
        });
      } catch (e) {
        setIsLoading(false);
        Alert.alert(e);
      }
    } else {
      Alert.alert(t("create-event.validation-failed-error"));
    }
  };

  const cancelForm = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <KeyboardAwareScrollViewComponent containerStyles={styles.container}>
          {backgroundImage ? (
            <TouchableOpacity
              onPress={onUploadImageButtonPress}
              style={styles.imageEditSection}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: backgroundImage.uri }}
                />
              </View>
              <Feather name={"edit"} style={styles.editIcon} />
            </TouchableOpacity>
          ) : editingEvent ? (
            <TouchableOpacity
              onPress={onUploadImageButtonPress}
              style={styles.imageEditSection}
            >
              <View style={styles.imageContainer}>
                <EventHubImage
                  imageId={editingEvent.backgroundImage.imageId}
                  filename={editingEvent.backgroundImage.bigFilename}
                />
              </View>
              <Feather name={"edit"} style={styles.editIcon} />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={onUploadImageButtonPress}
                style={styles.imageUploadSection}
              >
                <Feather name={"upload"} style={styles.uploadIcon} />
              </TouchableOpacity>
              {Field.IMAGE in errors ? (
                <FormError
                  errorText={errors[Field.IMAGE]}
                  style={{ marginTop: 5 }}
                />
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
              {t("create-event.at-least-one-translation-required-info")}
            </Text>
            <TextInputContainer
              label={t("create-event.name-label")}
              placeholder={t("create-event.enter-event-name")}
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
              label={t("create-event.description-label")}
              placeholder={t("create-event.enter-event-description")}
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
              label={t("create-event.location-label")}
              placeholder={t("create-event.enter-event-location")}
              value={location[currentFormLanguage]}
              onChangeText={(text) => {
                var value = { ...location };
                value[currentFormLanguage] = text;
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
                  title={t("create-event.set")}
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
                  title={t("create-event.set")}
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
              textColor="black"
              confirmTextIOS={t("create-event.calendar.confirm")}
              cancelTextIOS={t("create-event.calendar.cancel")}
            />
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title={t("create-event.submit")}
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
        </KeyboardAwareScrollViewComponent>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageUploadSection: {
    width: "100%",
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
    borderStyle: "dotted",
    borderColor: "#096233",
    borderWidth: 3,
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
  editIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 48,
    color: "#7F7F7F",
  },
  imageEditSection: {
    width: "100%",
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  uploadIcon: {
    fontSize: 64,
    color: "#096233",
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
    borderColor: "#BC022C",
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});
