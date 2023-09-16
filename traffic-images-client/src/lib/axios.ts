import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import merge from "lodash/merge";

function extractResponseDataInterceptor<T>(
  response: AxiosResponse
): AxiosResponse<T> {
  return response.data;
}

function handleErrorResponseInterceptor(
  error: AxiosError<unknown>
): Promise<unknown> {
  const message = error.message;
  if (message) {
    console.error("[Axios Error]:", message);
  }

  return Promise.reject(error);
}

const createAxiosInstance = (additionalConfig?: AxiosRequestConfig) => {
  const defaultConfig = {
    timeout: process.env.NODE_ENV === "development" ? 0 : 60000,
  };

  const config = additionalConfig
    ? merge(defaultConfig, additionalConfig)
    : defaultConfig;

  const instance = Axios.create(config);

  instance.interceptors.response.use(
    extractResponseDataInterceptor,
    handleErrorResponseInterceptor
  );

  return instance;
};

export { createAxiosInstance };
