import { render } from "@testing-library/react";
import { LoadingComponent } from "../LoadingComponent"; // Replace with the correct path

describe("LoadingComponent", () => {
  it("renders without crashing", () => {
    render(<LoadingComponent />);
  });
});
