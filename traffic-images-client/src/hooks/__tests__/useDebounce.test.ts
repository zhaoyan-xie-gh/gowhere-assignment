import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  const DELAY = 400;

  beforeEach(() => {
    jest.useFakeTimers();
  });
  test("shoud return updated value if time is longer than delay", () => {
    const firstValue = "first-value";
    const secondValue = "second-value";
    const debounceHook = renderHook(() => useDebounce(firstValue, DELAY));

    expect(debounceHook.result.current).toBe(firstValue);

    act(() => {
      setTimeout(() => {
        debounceHook.rerender(secondValue);
        expect(debounceHook.result.current).toBe(secondValue);
      }, DELAY + 100);
    });
  });
});
