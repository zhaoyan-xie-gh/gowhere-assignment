import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useHandleApiErrors } from "../../../hooks/useHandleApiErrors";
import { TrafficImagesHttpService } from "../services";
import { LatLongWithNameByFirstLetter, ReverseGeoCodingDto } from "../types";
import { queryKeys } from "./queryKeys";

export interface UseReverseGeoCodeParams {
  dto: Partial<ReverseGeoCodingDto>;
  isEnabled?: boolean;
}
export const useReverseGeoCode = ({
  dto,
  isEnabled,
}: UseReverseGeoCodeParams) => {
  const handleError = useHandleApiErrors();

  const trafficImagesHttpService = new TrafficImagesHttpService();
  return useQuery<
    LatLongWithNameByFirstLetter,
    AxiosError<void>,
    LatLongWithNameByFirstLetter,
    ReturnType<typeof queryKeys.reverseGeoCode>
  >(
    queryKeys.reverseGeoCode(dto),
    ({
      queryKey: [
        {
          dto: { areaMetadata, locations },
        },
      ],
    }) =>
      areaMetadata && locations
        ? trafficImagesHttpService.reverseGeoCoding({ areaMetadata, locations })
        : Promise.reject(),
    {
      enabled: isEnabled,
      staleTime: Infinity,
      onError: (error) => {
        handleError({ error, toastTitle: "Reverse GeoCode Error" });
      },
    }
  );
};
