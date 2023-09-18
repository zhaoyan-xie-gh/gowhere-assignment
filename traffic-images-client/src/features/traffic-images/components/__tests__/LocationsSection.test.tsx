import { render } from "@testing-library/react";
import * as LocationSelectionContext from "../../contexts/location-selection-context";
import { LatLongWithNameByFirstLetter } from "../../types";
import { LocationsSection } from "../LocationsSection";

jest.mock("../../contexts/location-selection-context", () => ({
  __esModule: true,
  ...jest.requireActual("../../contexts/location-selection-context"),
}));

// Create a mock data object for testing
const mockLocationsByFirstLetter: LatLongWithNameByFirstLetter = {
  A: [
    { location: { latitude: 1, longitude: 2 }, name: "Location A1" },
    { location: { latitude: 3, longitude: 4 }, name: "Location A2" },
  ],
  B: [{ location: { latitude: 5, longitude: 6 }, name: "Location B1" }],
};

describe("LocationsSection", () => {
  beforeEach(() => {
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
  });

  test("renders LocationsSection with data", () => {
    const { getByText } = render(
      <LocationsSection locationsByFirstLetter={mockLocationsByFirstLetter} />
    );
    // Check if the first letter badges are rendered
    expect(getByText("A")).toBeInTheDocument();
    expect(getByText("B")).toBeInTheDocument();

    // Check if location cards are rendered
    expect(getByText("Location A1")).toBeInTheDocument();
    expect(getByText("Location A2")).toBeInTheDocument();
    expect(getByText("Location B1")).toBeInTheDocument();
  });

  test("renders LocationsSection with no data", () => {
    const { container } = render(
      <LocationsSection locationsByFirstLetter={undefined} />
    );

    // Check if the component renders with no errors
    expect(container).toBeDefined();
  });
});
