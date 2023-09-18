import { QueryClient, QueryClientProvider } from "react-query";

interface TestProvidersProps {
  children?: JSX.Element;
}

export const queryClient = new QueryClient();
export const TestProviders = ({ children }: TestProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
