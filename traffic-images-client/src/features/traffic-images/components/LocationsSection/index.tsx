import { Box } from "@chakra-ui/react";
import { LatLongWithNameByFirstLetter } from "../../types";
import { LocationSectionComponent } from "./components/LocationSectionComponent";

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
      <LocationSectionComponent locations={locationsByFirstLetter} />
    </Box>
  ) : null;
};
