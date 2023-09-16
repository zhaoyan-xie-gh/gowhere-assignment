import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { LatLong } from "../types";

interface UnknownLocationProps {
  location: LatLong;
}
export const UnknownLocation = ({
  location: { latitude, longitude },
}: UnknownLocationProps) => {
  return (
    <WrapItem>
      <Card border="1px solid red" bg="red.100" p="2">
        <CardHeader>
          <Heading size="sm">Unknown location</Heading>
        </CardHeader>
        <CardBody>
          <Heading size="xs" textTransform="uppercase">
            Latitude : Longitude
          </Heading>
          <Text pt="2" fontSize="sm">
            {latitude} : {longitude}
          </Text>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
