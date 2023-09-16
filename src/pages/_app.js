import ErrorFallback from "@/components/ErrorFallback";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ChakraProvider>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default MyApp;
