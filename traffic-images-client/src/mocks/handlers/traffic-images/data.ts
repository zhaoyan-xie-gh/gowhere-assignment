import { mock } from "jest-mock-extended";
import {
  LatLongWithNameByFirstLetter,
  TrafficImageCamera,
  TrafficImagesResponse,
} from "../../../features/traffic-images/types";
import { mockKnownArea } from "../weather-forecast/data";

const mockCamera = mock<TrafficImageCamera>({
  image: "/some/image/url",
  location: {
    latitude: 1.38,
    longitude: 103.8,
  },
});
export const mockTrafficImagesResponse = mock<TrafficImagesResponse>({
  items: [
    {
      cameras: [mockCamera],
      timestamp: "2021-09-14T20:38:41",
    },
  ],
});

export const mockLatLongWithNameByFirstLetter: LatLongWithNameByFirstLetter = {
  A: [{ name: mockKnownArea.name, location: mockCamera.location }],
};
