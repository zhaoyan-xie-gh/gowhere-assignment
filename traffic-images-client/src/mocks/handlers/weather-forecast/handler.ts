import { HTTP_PROXY_PATH } from "@/config/env";
import { rest } from "msw";
import { WeatherForecast2HResponse } from "../../../features/weather-forecast/types";
import { mockWeatherForecast2HResponse } from "./data";

export const handlers = [
  rest.get(
    `${HTTP_PROXY_PATH}/v1/environment/2-hour-weather-forecast`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<WeatherForecast2HResponse>(mockWeatherForecast2HResponse)
      );
    }
  ),
];
