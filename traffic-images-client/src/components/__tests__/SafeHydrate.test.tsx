import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider
import { SafeHydrate } from "../SafeHydrate";

describe("SafeHydrate Component", () => {
  const queryClient = new QueryClient();

  it("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SafeHydrate dehydratedState={null}>
          <div>Test Content</div>
        </SafeHydrate>
      </QueryClientProvider>
    );
  });

  it("renders children when document is defined", () => {
    const originalDocument = global.document;
    global.document = { createElement: () => ({}) } as unknown as Document;

    render(
      <QueryClientProvider client={queryClient}>
        <SafeHydrate dehydratedState={null}>
          <div>Test Content</div>
        </SafeHydrate>
      </QueryClientProvider>
    );

    // Check if the child content is rendered
    const childElement = screen.getByText("Test Content");
    expect(childElement).toBeInTheDocument();

    // Restore the original 'document'
    global.document = originalDocument;
  });
});
