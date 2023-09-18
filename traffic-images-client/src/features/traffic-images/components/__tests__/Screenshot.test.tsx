import { render } from "@testing-library/react";
import * as LocationSelectionContext from "../../contexts/location-selection-context";
import { TrafficImagesResponse } from "../../types";
import { Screenshot } from "../Screenshot";

jest.mock("../../contexts/location-selection-context", () => ({
  __esModule: true,
  ...jest.requireActual("../../contexts/location-selection-context"),
}));

const mockTrafficData = {
  items: [
    {
      cameras: [
        {
          location: {
            latitude: 123.456,
            longitude: -78.9,
          },
          image: "mock-image-url",
        },
      ],
    },
    {
      cameras: [
        {
          location: {
            latitude: 987.654,
            longitude: -32.1,
          },
          image: "another-image-url",
        },
      ],
    },
  ],
} as TrafficImagesResponse;

describe("Screenshot Component", () => {
  test("renders traffic images when selected location matches", () => {
    jest
      .spyOn(LocationSelectionContext, "useLocationSelection")
      .mockReturnValue({
        selectedLocation: {
          location: {
            latitude: 123.456,
            longitude: -78.9,
          },
          name: "Sample Location",
        },
        setSelectedLocation: jest.fn(),
      });
    const { getByAltText } = render(
      <Screenshot trafficData={mockTrafficData} />
    );

    const imageElement = getByAltText("Sample Location Traffic Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  test('renders "No camera image" when there are no matching camera images', () => {
    jest
      .spyOn(LocationSelectionContext, "useLocationSelection")
      .mockReturnValue({
        selectedLocation: {
          location: {
            latitude: 111.111,
            longitude: 99,
          },
          name: "Sample Location",
        },
        setSelectedLocation: jest.fn(),
      });

    const { getByText } = render(<Screenshot trafficData={mockTrafficData} />);

    const noImageText = getByText("No camera image");
    expect(noImageText).toBeInTheDocument();
  });

  test('renders "Please select a location from above" when no location is selected', () => {
    jest
      .spyOn(LocationSelectionContext, "useLocationSelection")
      .mockReturnValue({
        selectedLocation: undefined,
        setSelectedLocation: jest.fn(),
      });
    const { getByText } = render(<Screenshot trafficData={mockTrafficData} />);

    const selectLocationText = getByText("Please select a location from above");
    expect(selectLocationText).toBeInTheDocument();
  });
});
