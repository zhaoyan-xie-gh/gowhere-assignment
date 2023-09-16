import { useQuery } from "react-query";
import { TrafficImagesHttpService } from "../services";
import { queryKeys } from "./queryKeys";

interface UseGetTrafficImagesParams {
  datetime: string | undefined;
}

const REFETCH_INTERVAL = 2 * 60 * 1000;

export const useGetTrafficImages = ({
  datetime,
}: UseGetTrafficImagesParams) => {
  const httpService = new TrafficImagesHttpService();

  return useQuery(
    queryKeys.list({ datetime }),
    () => httpService.getTrafficImages({ datetime }),
    {
      retry: 0,
      refetchInterval: datetime ? undefined : REFETCH_INTERVAL,
    }
  );
};
