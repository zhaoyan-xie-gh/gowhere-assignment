import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "react-query";
import { WeatherForecastHttpService } from "../services";
import { WeatherForecast2HParams } from "../types";
import { queryKeys } from "./queryKeys";

const STALE_TIME = 600_000;
export const useGetTwoHourWeatherForecast = ({
  datetime,
}: WeatherForecast2HParams) => {
  const httpService = new WeatherForecastHttpService();

  const debouncedDatetime = useDebounce(datetime);

  return useQuery(
    queryKeys.list({ datetime: debouncedDatetime }),
    () => httpService.getTwoHourForecast({ datetime: debouncedDatetime }),
    {
      staleTime: STALE_TIME,
      keepPreviousData: true,
    }
  );
};
