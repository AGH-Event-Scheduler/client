import { toSimpleDateString } from "../../../utils/date";

export const getFirstAndLastDayOfWeek = (date: Date): DateRange => {
  const currentDate = new Date(date);
  // HACK - it calculates wrong for the sunday, so if sunday is detected change it to saturday for calculations
  if (currentDate.getDay() === 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  const dayOfWeek = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  const lastDayOfWeek = new Date(currentDate);

  // Calculate the number of days to subtract/add for Monday as the first day and Sunday as the last day
  const daysToSubtract = dayOfWeek - 1; // Subtract to get to Monday
  const daysToAdd = 7 - dayOfWeek; // Add to get to Sunday

  // Set the first day of the week (Monday)
  firstDayOfWeek.setDate(currentDate.getDate() - daysToSubtract);
  // Set the last day of the week (Sunday)
  lastDayOfWeek.setDate(currentDate.getDate() + daysToAdd);

  return { startDate: firstDayOfWeek, endDate: lastDayOfWeek };
};

export const getNextDay = (date: Date) => {
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  return next;
};

export const getPreviousDay = (date: Date) => {
  const next = new Date(date);
  next.setDate(date.getDate() - 1);
  return next;
};

export const getDatesInRange = (startDate: Date, endDate: Date) => {
  // this has no check whether startDate < endDate. Use carefully

  var result = [startDate];

  while (!isTheSameDay(startDate, endDate)) {
    startDate = getNextDay(startDate);
    result.push(startDate);
  }

  return result;
};

export const isTheSameDay = (day1: Date, day2: Date) => {
  return (
    day1.getFullYear() == day2.getFullYear() &&
    day1.getMonth() == day2.getMonth() &&
    day1.getDate() == day2.getDate()
  );
};

export const isInDateRange = (day: Date, dateRange: DateRange) => {
  return (
    dateRange.startDate.valueOf() <= day.valueOf() &&
    day.valueOf() <= dateRange.endDate.valueOf()
  );
};

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
