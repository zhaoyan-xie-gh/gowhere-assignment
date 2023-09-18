import { render } from "@testing-library/react";
import { WeatherForecast2HResponseItem } from "../../types";
import { WeatherForecastWidget } from "../WeatherForecastWidget";

// Mock the useLocationSelection context
jest.mock(
  "@/features/traffic-images/contexts/location-selection-context",
  () => ({
    useLocationSelection: () => ({
      selectedLocation: { name: "Your Selected Location" },
    }),
  })
);

// Mock weather data
const weatherData = {
  forecasts: [
    {
      area: "Your Selected Location",
      forecast: "Sunny",
    },
  ],
  valid_period: {
    start: "2023-09-14T10:00:00Z",
    end: "2023-09-14T12:00:00Z",
  },
} as WeatherForecast2HResponseItem;

describe("WeatherForecastWidget Component", () => {
  it("renders the component with weather data", () => {
    const { getByText, getByRole } = render(
      <WeatherForecastWidget weatherData={weatherData} />
    );

    expect(getByRole("heading")).toHaveTextContent("2-hour weather forecast");
    expect(getByText("Sunny")).toBeInTheDocument();
    expect(getByText("2023-09-14, 06:00")).toBeInTheDocument();
    expect(getByText("2023-09-14, 08:00")).toBeInTheDocument();
  });

  it("renders the component with no weather data", () => {
    const { getByText } = render(
      <WeatherForecastWidget weatherData={undefined} />
    );
    expect(getByText("No data")).toBeInTheDocument();
  });
});
