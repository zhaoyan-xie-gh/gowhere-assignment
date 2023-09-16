import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useErrorBoundary } from "react-error-boundary";

interface UseHandleApiErrorsFunctionParams {
  toastTitle: string;
  error: AxiosError<unknown, unknown>;
}

export const useHandleApiErrors = () => {
  const { showBoundary } = useErrorBoundary();
  const toast = useToast();

  return function ({ toastTitle, error }: UseHandleApiErrorsFunctionParams) {
    showBoundary(error);
    toast({
      title: toastTitle,
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
};
