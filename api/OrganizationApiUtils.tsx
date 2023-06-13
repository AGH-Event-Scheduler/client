export const fetchButtonList = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const buttonList: string[] = [
        "Koło naukowe Bit",
        "Koło naukowe znawców technologii",
        "Koło naukowe grających na skrzypcach balsdlasldlas ",
        "Koło naukowe Bit",
        "Koło naukowe znawców technologii",
        "Koło naukowe grających na skrzypcach balsdlasldlas ",
        "Koło naukowe Bit",
        "Koło naukowe znawców technologii",
        "Koło naukowe grających na skrzypcach balsdlasldlas ",
        "Koło naukowe Bit",
        "Koło naukowe znawców technologii",
      ];
      resolve(buttonList);
    }, 1000);
  });
};
