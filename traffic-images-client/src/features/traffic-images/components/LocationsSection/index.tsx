import { Box } from "@chakra-ui/react";
import {
  LatLongWithNameByFirstLetter,
  UNKNOWN_LOCATION_KEY,
} from "../../types";
import { LocationSectionComponent } from "./components/LocationSectionComponent";

interface LocationsSectionProps {
  locationsByFirstLetter: LatLongWithNameByFirstLetter | undefined;
}

export const LocationsSection = ({
  locationsByFirstLetter,
}: LocationsSectionProps) => {
  const knownLocations = Object.keys(locationsByFirstLetter ?? {})
    .filter((key) => key !== UNKNOWN_LOCATION_KEY)
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: locationsByFirstLetter?.[key] ?? [],
      }),
      {} as LatLongWithNameByFirstLetter
    );
  const unknownLocations: LatLongWithNameByFirstLetter = {
    [UNKNOWN_LOCATION_KEY]:
      locationsByFirstLetter?.[UNKNOWN_LOCATION_KEY] ?? [],
  };
  return (
    <Box
      maxH="300"
      border="1px solid"
      borderColor="gray.300"
      overflowY="scroll"
      bg="gray.100"
      p="2"
      mt={{ base: "0", md: "4" }}
      mb="4"
    >
      <LocationSectionComponent locations={knownLocations} />
      <LocationSectionComponent locations={unknownLocations} />
    </Box>
  );
};
