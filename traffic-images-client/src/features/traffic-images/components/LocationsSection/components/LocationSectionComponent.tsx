import { Badge, Box, Flex, Wrap } from "@chakra-ui/react";
import { LatLongWithNameByFirstLetter } from "../../../types";
import { LocationCard } from "./LocationCard";

interface LocationSectionComponentProps {
  locations: LatLongWithNameByFirstLetter;
}

export const LocationSectionComponent = ({
  locations,
}: LocationSectionComponentProps) => {
  return Object.keys(locations)
    .sort((aFirstLetter, bFirstLetter) =>
      aFirstLetter.localeCompare(bFirstLetter)
    )
    .map((firstLetter) => {
      const locationsWithNames = locations[firstLetter];
      return (
        <Box key={`${firstLetter}-section`}>
          <Flex flexDir={{ base: "column", md: "row" }} gap="6" my="6">
            <Badge border="1px" fontWeight="bold" colorScheme="purple">
              {firstLetter}
            </Badge>
            <Wrap>
              {locationsWithNames?.map((locationWithName) => {
                const { latitude, longitude } = locationWithName.location;
                return (
                  <LocationCard
                    key={`${latitude}-${longitude}`}
                    locationWithName={locationWithName}
                  />
                );
              })}
            </Wrap>
          </Flex>
        </Box>
      );
    });
};
