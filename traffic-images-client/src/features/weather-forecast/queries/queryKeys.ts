import { WeatherForecast2HParams } from "../types";

const PREFIX = "@@weather-forecast";

export const queryKeys = {
  all: [{ feature: PREFIX }],
  list: (params: WeatherForecast2HParams) => [
    {
      ...queryKeys.all[0],
      component: "list",
      ...params,
    },
  ],
};
