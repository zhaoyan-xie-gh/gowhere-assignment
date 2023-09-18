import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorFallback } from "../ErrorFallback";

describe("ErrorFallback Component", () => {
  it("renders with the error message and a refresh button", async () => {
    const user = userEvent.setup();
    const resetErrorBoundary = jest.fn();
    const mockError = new Error("Test Error");
    render(
      <ErrorFallback
        resetErrorBoundary={resetErrorBoundary}
        error={mockError}
      />
    );

    // Check if the error message is displayed
    const errorMessage = screen.getByText("Ooops, something went wrong :(");
    expect(errorMessage).toBeInTheDocument();

    // Check if the refresh button is displayed
    const refreshButton = screen.getByText("Refresh");
    expect(refreshButton).toBeInTheDocument();

    // Simulate a click on the refresh button
    await user.click(refreshButton);

    // Check if resetErrorBoundary is called
    expect(resetErrorBoundary).toHaveBeenCalled();
  });
});
