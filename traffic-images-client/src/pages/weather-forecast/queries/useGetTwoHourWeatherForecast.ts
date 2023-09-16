import { useQuery } from "react-query";
import { WeatherForecastHttpService } from "../services";
import { queryKeys } from "./queryKeys";

export const useGetTwoHourWeatherForecast = () => {
  const httpService = new WeatherForecastHttpService();

  return useQuery(queryKeys.list(), () => httpService.getTwoHourForecast(), {
    staleTime: Infinity,
  });
};
