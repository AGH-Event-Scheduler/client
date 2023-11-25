import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { FormDataFileUpload } from "../../api/api-utils";
import { Language, MultiLanguageText } from "../../api/types";

export enum Field {
  IMAGE = "img",
  NAME = "name",
  DESCRIPTION = "dsc",
  LOCATION = "loc",
  DATE = "date",
}

export const useCreateUpdateEventFormValidation = () => {
  const { t, i18n } = useTranslation();

  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  const runCreateValidators = (
    backgroundImage: FormDataFileUpload,
    name: MultiLanguageText,
    description: MultiLanguageText,
    location: MultiLanguageText,
    startDate: Date,
    endDate: Date,
  ) => {
    var newErrors = {};
    const validatorResults = [
      validateImage(Field.IMAGE, backgroundImage, newErrors),
      validateTextField(Field.NAME, name, newErrors),
      validateTextField(Field.DESCRIPTION, description, newErrors),
      validateTextField(Field.LOCATION, location, newErrors),
      validateStartDateBeforeEndDateDate(
        Field.DATE,
        startDate,
        endDate,
        newErrors,
      ),
      validateStartDateInThePast(Field.DATE, startDate, endDate, newErrors),
    ];
    setErrors(newErrors);

    return validatorResults.every((e) => e);
  };

  const runUpdateValidators = (
    backgroundImage: FormDataFileUpload,
    name: MultiLanguageText,
    description: MultiLanguageText,
    location: MultiLanguageText,
    startDate: Date,
    endDate: Date,
  ) => {
    var newErrors = {};
    const validatorResults = [
      validateTextField(Field.NAME, name, newErrors),
      validateTextField(Field.DESCRIPTION, description, newErrors),
      validateTextField(Field.LOCATION, location, newErrors),
      validateStartDateBeforeEndDateDate(
        Field.DATE,
        startDate,
        endDate,
        newErrors,
      ),
    ];
    setErrors(newErrors);

    return validatorResults.every((e) => e);
  };

  const validateImage = (
    field: Field,
    backgroundImage: FormDataFileUpload,
    errors,
  ) => {
    if (!backgroundImage) {
      errors[field] = t("create-event.background-image-required-error");
      return false;
    }
    return true;
  };

  const validateTextField = (
    field: Field,
    state: MultiLanguageText,
    errors,
  ) => {
    if (!/\S/.test(state[Language.PL]) && !/\S/.test(state[Language.EN])) {
      errors[field] = t("create-event.at-least-one-translation-required-error");
      return false;
    }
    return true;
  };

  const validateStartDateBeforeEndDateDate = (
    field: Field,
    startDate: Date,
    endDate: Date,
    errors,
  ) => {
    if (startDate.valueOf() >= endDate.valueOf()) {
      errors[field] = t("create-event.start-date-not-before-end-date-error");
      return false;
    }
    return true;
  };

  const validateStartDateInThePast = (
    field: Field,
    startDate: Date,
    endDate: Date,
    errors,
  ) => {
    if (startDate.valueOf() < new Date().valueOf()) {
      errors[field] = t("create-event.start-date-in-the-past-error");
      return false;
    }
    return true;
  };

  return { errors, runCreateValidators, runUpdateValidators };
};
