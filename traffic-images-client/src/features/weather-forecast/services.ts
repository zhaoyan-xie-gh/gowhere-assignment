import { httpApiClient } from "@/gateways/httpApiClient";
import { WeatherForecast2HParams, WeatherForecast2HResponse } from "./types";

export class WeatherForecastHttpService {
  async getTwoHourForecast({
    datetime,
  }: WeatherForecast2HParams): Promise<WeatherForecast2HResponse> {
    return httpApiClient.get("/v1/environment/2-hour-weather-forecast", {
      params: { date_time: datetime },
    });
  }
}
