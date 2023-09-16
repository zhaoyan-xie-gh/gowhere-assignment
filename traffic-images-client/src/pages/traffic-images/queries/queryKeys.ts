import { TrafficImagesParams } from "../types";
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
};
