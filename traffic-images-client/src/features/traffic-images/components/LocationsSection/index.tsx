import { Badge, Box, Flex, Wrap } from "@chakra-ui/react";
import { LatLongWithNameByFirstLetter } from "../../types";
import { LocationCard } from "./components/LocationCard";

interface LocationsSectionProps {
  locationsByFirstLetter: LatLongWithNameByFirstLetter | undefined;
}

export const LocationsSection = ({
  locationsByFirstLetter,
}: LocationsSectionProps) => {
  return locationsByFirstLetter ? (
    <Box
      maxH="250"
      border="1px solid"
      borderColor="gray.300"
      overflowY="scroll"
      bg="gray.100"
      p="2"
      mt={{ base: "0", md: "4" }}
      mb="4"
    >
      {Object.keys(locationsByFirstLetter)
        .sort((aFirstLetter, bFirstLetter) =>
          aFirstLetter.localeCompare(bFirstLetter)
        )
        .map((firstLetter) => {
          const locationsWithNames = locationsByFirstLetter[firstLetter];
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
        })}
    </Box>
  ) : null;
};
