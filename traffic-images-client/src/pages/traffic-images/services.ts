import { httpApiClient } from "@/gateways/httpApiClient";

export class TrafficImagesHttpService {
  async getTrafficImages() {
    return httpApiClient.get("/v1/transport/traffic-images");
  }
}
