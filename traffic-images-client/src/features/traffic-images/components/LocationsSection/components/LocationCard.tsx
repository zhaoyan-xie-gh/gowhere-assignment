import { Card, CardHeader, Heading, WrapItem } from "@chakra-ui/react";
import { useLocationSelection } from "../../../contexts/location-selection-context";
import { LatLongWithName } from "../../../types";

interface LocationProps {
  locationWithName: LatLongWithName;
}

export const LocationCard = ({ locationWithName }: LocationProps) => {
  const { selectedLocation, setSelectedLocation } = useLocationSelection();
  const { name } = locationWithName;

  const isSelected = selectedLocation?.name === name;
  return (
    <WrapItem>
      <Card
        border="1px solid"
        borderColor={isSelected ? "purple.300" : "blue.300"}
        bg={isSelected ? "purple.100" : "blue.50"}
        p="2"
        w={{ base: "15rem", md: "15rem" }}
        _hover={{
          bg: "orange.100",
          cursor: "pointer",
        }}
        onClick={() => setSelectedLocation(locationWithName)}
      >
        <CardHeader p={{ base: "0", md: "2" }}>
          <Heading size="sm">{name}</Heading>
        </CardHeader>
      </Card>
    </WrapItem>
  );
};
