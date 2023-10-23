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

export function toDayShortcut(date: Date) {
  return date.toLocaleString("default", { weekday: "narrow" })[0];
}

export function toDayOfWeekName(date: Date) {
  return date.toLocaleString("default", { weekday: "long" }).split(",")[0];
}

export function toMonthName(date: Date) {
  return date.toLocaleString("default", { month: "long" });
}

export function toDayDateString(date: Date) {
  return date.toLocaleString("default", { day: "2-digit" });
}

export function toBeautifiedDateString(date: Date) {
  return `${toDayDateString(date)}, ${toMonthName(date)}`;
}

export function toBeautifiedTimeString(date: Date) {
  return date.toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toBeautifiedDateTimeString(date: Date) {
  return `${toBeautifiedDateString} ${toBeautifiedTimeString(date)}`;
}
