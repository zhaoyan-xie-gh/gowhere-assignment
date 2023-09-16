import { Card, CardHeader, Heading, WrapItem } from "@chakra-ui/react";
import { AreaMetadata } from "../../weather-forecast/types";
import { LatLong } from "../types";

interface LocationProps {
  areaMetadata: AreaMetadata[] | undefined;
  location: LatLong;
}

export const LocationCard = ({ areaMetadata, location }: LocationProps) => {
  const matchedAreaMetadata = areaMetadata?.find(
    ({ label_location }) =>
      label_location.latitude === location.latitude &&
      label_location.longitude === location.longitude
  );
  return (
    <WrapItem>
      <Card border="1px solid" borderColor="blue.300" bg="blue.50" p="2">
        <CardHeader>
          <Heading size="sm">Some location</Heading>
        </CardHeader>
      </Card>
    </WrapItem>
  );
};
