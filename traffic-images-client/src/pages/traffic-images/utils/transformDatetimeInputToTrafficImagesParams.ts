import { DatetimeInput } from "../types";

export const transformDatetimeInputToTrafficImagesParams = (
  datetime: DatetimeInput
): string | undefined => {
  const { date, time } = datetime;
  return date === undefined || time === undefined
    ? undefined
    : `${date}T${time}`;
};
