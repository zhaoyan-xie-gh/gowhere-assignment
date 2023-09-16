export interface AreaMetadata {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
}
export interface Forecast {
  area: string;
  forecast: string;
}

export interface WeatherForecast2HParams {
  datetime?: string; // datetime format eg "2023-09-14T20:38:41"
}

export interface WeatherForecast2HResponseItem {
  update_timestamp: string;
  timestamp: string;
  valid_period: {
    start: string;
    end: string;
  };
  forecasts: Forecast[];
}

export interface WeatherForecast2HResponse {
  area_metadata: AreaMetadata[];
  items: WeatherForecast2HResponseItem[];
}
