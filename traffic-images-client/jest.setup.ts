import { afterAll, afterEach, beforeAll } from "@jest/globals";
import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";
import { queryClient } from "./src/utils/TestProviders";

// Establish API mocking before all tests.
beforeAll(() => {
  console.log("[msw]: Listening to mock server");
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
