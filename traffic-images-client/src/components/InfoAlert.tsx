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
    <Alert
      status={status}
      mb="4"
      fontSize="sm"
      py={{ base: "1", md: "2" }}
      px={{ base: "2", md: "4" }}
    >
      <AlertIcon boxSize="4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
