import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  FormDataFileUpload,
  Language,
  MultiLanguageText,
} from "../../api/api-utils";

export enum Field {
  IMAGE = "img",
  NAME = "name",
  DESCRIPTION = "dsc",
  LOCATION = "loc",
  DATE = "date",
}

export const useEventFormValidation = () => {
  const { t, i18n } = useTranslation();

  const [errors, setErrors] = useState<{ [field: string]: string }>({});

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
    if (startDate.valueOf() < new Date().valueOf()) {
      errors[field] = t("create-event.start-date-in-the-past-error");
      return false;
    }
    if (startDate.valueOf() >= endDate.valueOf()) {
      errors[field] = t("create-event.start-date-not-before-end-date-error");
      return false;
    }
    return true;
  };

  const runValidators = (
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
      validateDate(Field.DATE, startDate, endDate, newErrors),
    ];
    setErrors(newErrors);

    return validatorResults.every((e) => e);
  };

  return { errors, runValidators };
};
