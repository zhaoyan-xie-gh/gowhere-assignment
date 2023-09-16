import { useDebounce } from "@/hooks/useDebounce";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { WeatherForecastHttpService } from "../services";
import { WeatherForecast2HParams, WeatherForecast2HResponse } from "../types";
import { queryKeys } from "./queryKeys";

const STALE_TIME = 600_000;
export const useGetTwoHourWeatherForecast = ({
  datetime,
}: WeatherForecast2HParams) => {
  const handleError = useHandleApiErrors();

  const httpService = new WeatherForecastHttpService();

  const debouncedDatetime = useDebounce(datetime);

  return useQuery<
    WeatherForecast2HResponse,
    AxiosError<void>,
    WeatherForecast2HResponse,
    ReturnType<typeof queryKeys.list>
  >(
    queryKeys.list({ datetime: debouncedDatetime }),
    () => httpService.getTwoHourForecast({ datetime: debouncedDatetime }),
    {
      staleTime: STALE_TIME,
      keepPreviousData: true,
      onError: (error) => {
        handleError({ error, toastTitle: "Weather Forecast Error" });
      },
    }
  );
};
