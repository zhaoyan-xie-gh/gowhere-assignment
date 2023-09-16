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

export interface WeatherForecastResponse {
  area_metadata: AreaMetadata[];
  items: {
    update_timestamp: string;
    timestamp: string;
    valid_period: {
      start: string;
      end: string;
    };
    forecasts: Forecast[];
  }[];
}
