import { act, getByText, render, waitFor } from "@testing-library/react";
import { TestProviders } from "../../utils/TestProviders";
import TrafficImages from "../traffic-images";

jest.mock("react-error-boundary", () => ({
  ...jest.requireActual("react-error-boundary"),
  useErrorBoundary: () => ({
    showBoundary: jest.fn(),
  }),
}));

describe("traffic-images-page", () => {
  test("renders TrafficImages component", async () => {
    act(() => {
      render(
        <TestProviders>
          <TrafficImages />
        </TestProviders>
      );
    });

    await waitFor(() =>
      expect(getByText("Pick a date-time to retrieve data")).toBeInTheDocument()
    );
  });
});
