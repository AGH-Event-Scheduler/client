import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormDataFileUpload } from "../../api/api-utils";
import { MultiLanguageText, Language } from "../../api/types";
import { checkUserExist } from "../../api/user-api-utlis";

export enum Field {
  BGIMG = "bg",
  LOGO = "logo",
  NAME = "name",
  DESCRIPTION = "dsc",
  LEADER = "lead",
}

export const useCreateOrganizationFormValidation = () => {
  const { t } = useTranslation();

  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  const runCreateValidators = async (
    backgroundImage: FormDataFileUpload,
    logoImage: FormDataFileUpload,
    name: MultiLanguageText,
    description: MultiLanguageText,
    leader: string,
  ) => {
    var newErrors = {};
    const validatorResults = [
      validateBackgroundImage(Field.BGIMG, backgroundImage, newErrors),
      validateLogoImage(Field.LOGO, logoImage, newErrors),
      validateMultiLanguageTextField(Field.NAME, name, newErrors),
      validateMultiLanguageTextField(Field.DESCRIPTION, description, newErrors),
      await validateLeaderExist(Field.LEADER, leader, newErrors),
    ];
    setErrors(newErrors);

    return validatorResults.every((e) => e);
  };

  const runUpdateValidators = async (
    backgroundImage: FormDataFileUpload,
    logoImage: FormDataFileUpload,
    name: MultiLanguageText,
    description: MultiLanguageText,
    leader: string,
  ) => {
    var newErrors = {};
    const validatorResults = [
      validateBackgroundImage(Field.BGIMG, backgroundImage, newErrors),
      validateLogoImage(Field.LOGO, logoImage, newErrors),
      validateMultiLanguageTextField(Field.NAME, name, newErrors),
      validateMultiLanguageTextField(Field.DESCRIPTION, description, newErrors),
      validateTextField(Field.LEADER, leader, newErrors),
      await validateLeaderExist(Field.LEADER, leader, newErrors),
    ];
    setErrors(newErrors);

    return validatorResults.every((e) => e);
  };

  const validateBackgroundImage = (
    field: Field,
    imageFile: FormDataFileUpload,
    errors,
  ) => {
    if (!imageFile) {
      errors[field] = t("create-organization.background-image-required-error");
      return false;
    }
    return true;
  };

  const validateLogoImage = (
    field: Field,
    imageFile: FormDataFileUpload,
    errors,
  ) => {
    if (!imageFile) {
      errors[field] = t("create-organization.logo-image-required-error");
      return false;
    }
    return true;
  };

  const validateMultiLanguageTextField = (
    field: Field,
    state: MultiLanguageText,
    errors,
  ) => {
    if (!/\S/.test(state[Language.PL]) && !/\S/.test(state[Language.EN])) {
      errors[field] = t(
        "create-organization.at-least-one-translation-required-error",
      );
      return false;
    }
    return true;
  };

  const validateTextField = (field: Field, text: string, errors) => {
    if (!/\S/.test(text)) {
      errors[field] = t("create-organization.input-required-error");
      return false;
    }
    return true;
  };

  const validateLeaderExist = async (field: Field, leader: string, errors) => {
    if (/\S/.test(leader)) {
      let userExist = await checkUserExist(leader);
      if (!userExist) {
        errors[field] = t("create-organization.user-does-not-exist-error");
        return false;
      }
      return true;
    }
    errors[field] = t("create-organization.input-required-error");
    return false;
  };

  return { errors, runCreateValidators, runUpdateValidators };
};
