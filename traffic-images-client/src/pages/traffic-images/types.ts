export interface DatetimeInput {
  date?: string;
  time?: string;
}

enum ApiInfo {
  Healthy = "healthy",
}

interface TrafficImageCamera {
  camera_id: string;
  image: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
}
interface TrafficImageItem {
  camera: TrafficImageCamera[];
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
