import { render } from "@testing-library/react";
import { InfoAlert } from "../InfoAlert";

describe("InfoAlert Component", () => {
  it("renders with the provided title and message", () => {
    const title = "Information";
    const message = "This is an info alert";
    const status = "info";

    const screen = render(
      <InfoAlert title={title} message={message} status={status} />
    );

    // Check if the title is displayed
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    // Check if the message is displayed
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });
});
