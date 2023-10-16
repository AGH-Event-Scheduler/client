import i18next from "i18next";
import en from "./resources/en.json";
import pl from "./resources/pl.json";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {translation: en},
    pl: {translation: pl}
}

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: resources
});

export default i18next;