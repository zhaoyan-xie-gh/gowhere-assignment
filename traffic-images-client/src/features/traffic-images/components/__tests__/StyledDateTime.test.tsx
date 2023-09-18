import { render } from "@testing-library/react";
import { StyledDatetime, StyledDatetimeProps } from "../StyledDatetime";

const mockOnChange = jest.fn();

const renderStyledDatetime = (props: Omit<StyledDatetimeProps, "onChange">) => {
  return render(<StyledDatetime onChange={mockOnChange} {...props} />);
};

describe("StyledDatetime Component", () => {
  test("renders with a label and placeholder", () => {
    const { getByText, getByPlaceholderText } = renderStyledDatetime({
      type: "date",
      label: "Date Label",
      value: undefined,
    });

    expect(getByText("Date Label")).toBeInTheDocument();
    expect(getByPlaceholderText("Select date...")).toBeInTheDocument();
  });

  test("renders with a default value", () => {
    const { getByDisplayValue } = renderStyledDatetime({
      type: "time",
      label: "Time Label",
      value: "12:34 PM",
    });

    expect(getByDisplayValue("12:34 PM")).toBeInTheDocument();
  });
});
