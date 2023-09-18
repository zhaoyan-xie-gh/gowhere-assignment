import { renderHook } from "@testing-library/react";
import { AxiosError } from "axios";
import { useHandleApiErrors } from "../useHandleApiErrors"; // Replace with the correct path

// Mock the useErrorBoundary and useToast hooks
const mockShowBoundary = jest.fn();
jest.mock("react-error-boundary", () => ({
  useErrorBoundary: jest.fn(() => ({ showBoundary: mockShowBoundary })),
}));

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  useToast: jest.fn(() => mockToast),
}));

describe("useHandleApiErrors Hook", () => {
  it("should call showBoundary and toast with the provided parameters", () => {
    const { result } = renderHook(() => useHandleApiErrors());

    const toastTitle = "Error Title";
    const error = {
      message: "An error occurred",
    } as AxiosError<unknown, unknown>;

    const handleApiErrors = result.current;
    handleApiErrors({ toastTitle, error });

    expect(mockShowBoundary).toHaveBeenCalledWith(error);

    expect(mockToast).toHaveBeenCalledWith({
      title: toastTitle,
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  });
});
