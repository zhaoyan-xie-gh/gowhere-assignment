import { HTTP_PROXY_PATH } from "@/config/env";
import { createAxiosInstance } from "@/lib/axios";
import cloneDeep from "lodash/cloneDeep";
import { TRAFFIC_IMAGES_SERVER_PATH } from "../config/env";

const getHTTPProxyConfig = () => {
  return { baseURL: HTTP_PROXY_PATH };
};
export const httpApiClient = createAxiosInstance(getHTTPProxyConfig());
httpApiClient.interceptors.request.use((config) => {
  const baseConfig = cloneDeep(config);
  return baseConfig;
});

const getTrafficImagesConfig = () => {
  return { baseURL: TRAFFIC_IMAGES_SERVER_PATH };
};
export const internalServerClient = createAxiosInstance(
  getTrafficImagesConfig()
);
internalServerClient.interceptors.request.use((config) => {
  const baseConfig = cloneDeep(config);
  return baseConfig;
});
