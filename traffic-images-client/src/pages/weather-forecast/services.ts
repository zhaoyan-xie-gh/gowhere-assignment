import { httpApiClient } from "@/gateways/httpApiClient";
import { WeatherForecastResponse } from "./types";

export class WeatherForecastHttpService {
  async getTwoHourForecast(): Promise<WeatherForecastResponse> {
    return httpApiClient.get("/v1/environment/2-hour-weather-forecast");
  }
}
