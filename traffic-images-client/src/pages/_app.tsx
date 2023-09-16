import { ErrorFallback } from "@/components/ErrorFallback";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ChakraProvider>
      <CSSReset />

      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default MyApp;
