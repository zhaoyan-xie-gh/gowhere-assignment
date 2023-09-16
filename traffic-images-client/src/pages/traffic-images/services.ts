import { httpApiClient } from "@/gateways/httpApiClient";
import { TrafficImagesParams, TrafficImagesResponse } from "./types";

export class TrafficImagesHttpService {
  async getTrafficImages({
    datetime,
  }: TrafficImagesParams): Promise<TrafficImagesResponse> {
    return httpApiClient.get("/v1/transport/traffic-images", {
      params: { date_time: datetime },
    });
  }
}
