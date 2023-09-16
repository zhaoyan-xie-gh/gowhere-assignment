import { HTTP_PROXY_PATH, TRAFFIC_IMAGES_SERVER_HOST } from "@/config/env";
import { createProxyMiddleware } from "http-proxy-middleware";
import { TRAFFIC_IMAGES_SERVER_DESTINATION_PATH } from "../../../../config/env";

// Reference: https://nextjs.org/docs/api-routes/request-helpers
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware({
  target: TRAFFIC_IMAGES_SERVER_HOST,
  pathRewrite: {
    [`^${HTTP_PROXY_PATH}/traffic-images-server`]:
      TRAFFIC_IMAGES_SERVER_DESTINATION_PATH,
  },
  secure: TRAFFIC_IMAGES_SERVER_HOST?.startsWith("https://"),
  changeOrigin: true,
});

export default proxy;
