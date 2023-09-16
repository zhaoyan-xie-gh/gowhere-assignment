import { useQuery } from "react-query";
import { useDebounce } from "../../../hooks/useDebounce";
import { TrafficImagesHttpService } from "../../../features/traffic-images/services";
import { queryKeys } from "./queryKeys";

interface UseGetTrafficImagesParams {
  datetime: string | undefined;
}

const REFETCH_INTERVAL = 2 * 60 * 1000;

export const useGetTrafficImages = ({
  datetime,
}: UseGetTrafficImagesParams) => {
  const httpService = new TrafficImagesHttpService();

  const debouncedDatetime = useDebounce(datetime);
  return useQuery(
    queryKeys.list({ datetime: debouncedDatetime }),
    () => httpService.getTrafficImages({ datetime: debouncedDatetime }),
    {
      retry: 0,
      refetchInterval: datetime ? undefined : REFETCH_INTERVAL,
      keepPreviousData: true,
    }
  );
};
