import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from "@chakra-ui/react";

interface InfoAlertProps extends AlertProps {
  message: string;
  title?: string;
}
export const InfoAlert = ({ status, title, message }: InfoAlertProps) => {
  return (
    <Alert status={status} mb="4">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
