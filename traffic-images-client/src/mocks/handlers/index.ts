import { handlers as trafficImagesHandler } from "./traffic-images/handler";
import { handlers as weatherForecastHandler } from "./weather-forecast/handler";

export const handlers = [...weatherForecastHandler, ...trafficImagesHandler];
