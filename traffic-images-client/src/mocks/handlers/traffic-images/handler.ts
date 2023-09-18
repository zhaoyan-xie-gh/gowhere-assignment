import { HTTP_PROXY_PATH } from "@/config/env";
import { rest } from "msw";
import {
  LatLongWithNameByFirstLetter,
  TrafficImagesResponse,
} from "../../../features/traffic-images/types";
import {
  mockLatLongWithNameByFirstLetter,
  mockTrafficImagesResponse,
} from "./data";

export const handlers = [
  rest.get(
    `${HTTP_PROXY_PATH}/v1/transport/traffic-images`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<TrafficImagesResponse>(mockTrafficImagesResponse)
      );
    }
  ),

  rest.post(`/internal/server/api/v1/reverse-geocode`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<LatLongWithNameByFirstLetter>(mockLatLongWithNameByFirstLetter)
    );
  }),
];
