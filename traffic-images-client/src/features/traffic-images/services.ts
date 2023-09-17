import { httpApiClient } from "@/gateways/httpApiClient";
import {
  LatLongWithNameByFirstLetter,
  ReverseGeoCodingDto,
  TrafficImagesParams,
  TrafficImagesResponse,
} from "./types";

export class TrafficImagesHttpService {
  async getTrafficImages({
    datetime,
  }: TrafficImagesParams): Promise<TrafficImagesResponse> {
    return httpApiClient.get("/v1/transport/traffic-images", {
      params: { date_time: datetime },
    });
  }

  async reverseGeoCoding(
    dto: ReverseGeoCodingDto
  ): Promise<LatLongWithNameByFirstLetter> {
    return httpApiClient.post(`/api/v1/reverse-geocode`, dto, {
      baseURL: "/internal/server",
    });
  }
}
