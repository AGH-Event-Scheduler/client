export function toUTCDate(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
}

export function toSimpleDateString(date = new Date()) {
  const year = date.toLocaleString("en-Us", { year: "numeric" });
  const month = date.toLocaleString("en-Us", {
    month: "2-digit",
  });
  const day = date.toLocaleString("en-Us", { day: "2-digit" });

  return [year, month, day].join("-");
}

export function toDayShortcut(date: Date, locale: string = "default") {
  return date.toLocaleString(locale, { weekday: "narrow" })[0];
}

export function toDayOfWeekName(date: Date, locale: string = "default") {
  return date.toLocaleString(locale, { weekday: "long" }).split(",")[0];
}

export function toMonthName(date: Date, locale: string = "default") {
  return date.toLocaleString(locale, { month: "long" });
}

export function toDayDateString(date: Date, locale: string = "default") {
  return date.toLocaleString(locale, { day: "2-digit" });
}

export function toBeautifiedDateString(date: Date, locale: string = "default") {
  return `${toDayDateString(date, locale)} ${toMonthName(date, locale)}`;
}

export function toBeautifiedTimeString(date: Date, locale: string = "default") {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toBeautifiedDateTimeString(
  date: Date,
  locale: string = "default",
) {
  return `${toBeautifiedDateString(date, locale)}, ${toBeautifiedTimeString(
    date,
    locale,
  )}`;
}
