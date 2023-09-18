import { mock } from "jest-mock-extended";
import { WeatherForecast2HResponseItem } from "../../../features/weather-forecast/types";

const mockForecast = {
  area: "Ang Mo Kio",
  forecast: "Fair (Night)",
};

const valid_period = {
  start: "2021-09-14T20:38:41",
  end: "2021-09-14T20:38:41",
};

const mockItems: WeatherForecast2HResponseItem =
  mock<WeatherForecast2HResponseItem>({
    valid_period,
    forecasts: [mockForecast],
  });
export const mockKnownArea = {
  name: "Ang Mo Kio",
  label_location: {
    latitude: 1.375,
    longitude: 103.839,
  },
};
export const mockWeatherForecast2HResponse = {
  area_metadata: [mockKnownArea],
  items: [mockItems],
};
