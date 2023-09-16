export interface DatetimeInput {
  date?: string;
  time?: string;
}

enum ApiInfo {
  Healthy = "healthy",
}

export interface LatLong {
  latitude: number;
  longitude: number;
}
export interface LatLongWithName {
  name: string | null;
  location: LatLong;
}
export interface LatLongWithNameByFirstLetter {
  [firstLetter: string]: LatLongWithName[];
}
export const UNKNOWN_LOCATION_KEY = "Unknown";

export interface TrafficImageCamera {
  camera_id: string;
  image: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
  location: LatLong;
  timestamp: string;
}
interface TrafficImageItem {
  cameras: TrafficImageCamera[];
  timestamp: string;
}

export interface TrafficImagesParams {
  datetime?: string; // datetime format eg "2023-09-14T20:38:41"
}
export interface TrafficImagesResponse {
  api_info: {
    status: ApiInfo;
  };
  items: TrafficImageItem[];
}
