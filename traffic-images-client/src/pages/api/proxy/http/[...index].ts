import { HTTP_PROXY_DESTINATION_PATH, HTTP_PROXY_PATH } from "@/config/env";
import { createProxyMiddleware } from "http-proxy-middleware";
import { DATA_GOV_HOST } from "../../../../config/env";

// Reference: https://nextjs.org/docs/api-routes/request-helpers
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware({
  target: DATA_GOV_HOST,
  pathRewrite: { [`^${HTTP_PROXY_PATH}`]: HTTP_PROXY_DESTINATION_PATH },
  secure: DATA_GOV_HOST?.startsWith("https://"),
  changeOrigin: true,
});

export default proxy;
