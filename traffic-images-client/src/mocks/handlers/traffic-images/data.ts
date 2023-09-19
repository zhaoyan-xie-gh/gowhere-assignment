import {
  ApiInfo,
  LatLongWithNameByFirstLetter,
  TrafficImageCamera,
  TrafficImagesResponse,
} from "../../../features/traffic-images/types";
import { mockKnownArea } from "../weather-forecast/data";

const mockCamera: TrafficImageCamera = {
  camera_id: "2701",
  image: "/some/image/url",
  image_metadata: {
    height: 240,
    width: 320,
    md5: "some-md5-hash",
  },
  location: {
    latitude: 1.38,
    longitude: 103.8,
  },
  timestamp: "2021-09-14T20:38:41",
};
export const mockTrafficImagesResponse: TrafficImagesResponse = {
  items: [
    {
      cameras: [mockCamera],
      timestamp: "2021-09-14T20:38:41",
    },
  ],
  api_info: {
    status: ApiInfo.Healthy,
  },
};

export const mockLatLongWithNameByFirstLetter: LatLongWithNameByFirstLetter = {
  A: [{ name: mockKnownArea.name, location: mockCamera.location }],
};
