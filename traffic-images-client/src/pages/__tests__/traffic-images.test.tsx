import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestProviders } from "../../utils/TestProviders";
import TrafficImages from "../traffic-images";

jest.mock("react-error-boundary", () => ({
  ...jest.requireActual("react-error-boundary"),
  useErrorBoundary: () => ({
    showBoundary: jest.fn(),
  }),
}));

const renderTrafficImagesPage = () => {
  return render(
    <TestProviders>
      <TrafficImages />
    </TestProviders>
  );
};

describe("traffic-images-page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders TrafficImages component", async () => {
    renderTrafficImagesPage();

    await waitFor(() =>
      expect(
        screen.getByText(
          "Pick a date-time to retrieve data at that moment, or the latest will be retrieved every two minutes."
        )
      ).toBeInTheDocument()
    );
  });

  test('should clear datetime input when "Clear" button is clicked', async () => {
    const user = userEvent.setup();
    renderTrafficImagesPage();

    await waitFor(async () => {
      const clearButton = screen.getByRole("button", { name: "Clear" });
      await user.click(clearButton);

      // Test date input
      const dateInput = screen.getByTestId("styled-datetime-input-date");
      expect(dateInput).toHaveValue("");
      await user.click(dateInput);
      const firstDates = screen.getAllByRole("cell", { name: "1" });
      await user.click(firstDates[0]);
      expect(dateInput).not.toHaveValue("");

      // Test time input
      const timeContainer = screen.getByTestId("styled-datetime-time");
      const timeInput = screen.getByTestId("styled-datetime-input-time");
      expect(timeInput).toHaveValue("");
      await user.click(timeInput);
      const timeIncreaseButton = timeContainer.querySelectorAll(".rdtBtn");
      await user.click(timeIncreaseButton[0]);
      expect(timeInput).not.toHaveValue("");

      // Test clear button
      await user.click(clearButton);

      expect(dateInput).toHaveValue("");
      expect(timeInput).toHaveValue("");
    });
  });
});
