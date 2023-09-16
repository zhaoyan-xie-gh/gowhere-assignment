import { TrafficImagesParams } from "../types";
import { UseReverseGeoCodeParams } from "./useReverseGeoCode";
const PREFIX = "@@traffic-images";

export const queryKeys = {
  all: [{ feature: PREFIX }],
  list: (params: TrafficImagesParams) => [
    {
      ...queryKeys.all[0],
      component: "list",
      params,
    },
  ],
  reverseGeoCode: (dto: UseReverseGeoCodeParams["dto"]) => [
    {
      ...queryKeys.all[0],
      component: "reverseGeoCode",
      dto,
    },
  ],
};
