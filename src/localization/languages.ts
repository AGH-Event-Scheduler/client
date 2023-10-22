import i18next from "./i18next";

interface Language {
    index: string,
    translation: string
}

export const languages: Language[] = [
    {index: "pl", translation: i18next.t("languages.pl")},
    {index: "en", translation: i18next.t("languages.en")}
]