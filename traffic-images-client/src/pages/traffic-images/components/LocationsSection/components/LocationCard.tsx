import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useLocationSelection } from "../../../contexts/location-selection-context";
import { LatLongWithName, UNKNOWN_LOCATION_KEY } from "../../../types";

interface LocationProps {
  locationWithName: LatLongWithName;
}

export const LocationCard = ({ locationWithName }: LocationProps) => {
  const { selectedLocation, setSelectedLocation } = useLocationSelection();
  const {
    name,
    location: { latitude, longitude },
  } = locationWithName;

  const isSelected = selectedLocation?.name === name;
  return (
    <WrapItem>
      <Card
        border="1px solid"
        borderColor={isSelected ? "purple.300" : "blue.300"}
        bg={isSelected ? "purple.100" : "blue.50"}
        p="2"
        w="15rem"
        _hover={{
          bg: "orange.100",
          cursor: "pointer",
        }}
        onClick={() => setSelectedLocation(locationWithName)}
      >
        <CardHeader>
          <Heading size="sm">{name}</Heading>
        </CardHeader>
        {name?.includes(UNKNOWN_LOCATION_KEY) && (
          <CardBody>
            <Flex>
              <Text noOfLines={1}>{latitude}</Text>,{" "}
              <Text noOfLines={1}>{longitude}</Text>
            </Flex>
          </CardBody>
        )}
      </Card>
    </WrapItem>
  );
};
