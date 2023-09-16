import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { TrafficImagesHttpService } from "../../../features/traffic-images/services";
import { useDebounce } from "../../../hooks/useDebounce";
import { useHandleApiErrors } from "../../../hooks/useHandleApiErrors";
import { TrafficImagesResponse } from "../types";
import { queryKeys } from "./queryKeys";

interface UseGetTrafficImagesParams {
  datetime: string | undefined;
}

const REFETCH_INTERVAL = 2 * 60 * 1000;

export const useGetTrafficImages = ({
  datetime,
}: UseGetTrafficImagesParams) => {
  const handleError = useHandleApiErrors();

  const httpService = new TrafficImagesHttpService();

  const debouncedDatetime = useDebounce(datetime);
  return useQuery<
    TrafficImagesResponse,
    AxiosError,
    TrafficImagesResponse,
    ReturnType<typeof queryKeys.list>
  >(
    queryKeys.list({ datetime: debouncedDatetime }),
    () => httpService.getTrafficImages({ datetime: debouncedDatetime }),
    {
      retry: 0,
      refetchInterval: datetime ? undefined : REFETCH_INTERVAL,
      keepPreviousData: true,
      onError: (error) => {
        handleError({ error, toastTitle: "Traffic Images Error" });
      },
    }
  );
};
