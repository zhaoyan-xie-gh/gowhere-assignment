import { Badge, Box, Divider, Grid, GridItem, Wrap } from "@chakra-ui/react";
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
          <Grid templateColumns={"repeat(12, 1fr)"} my="6">
            <GridItem colSpan={1}>
              <Badge border="1px" fontWeight="bold" colorScheme="purple">
                {firstLetter}
              </Badge>
            </GridItem>
            <GridItem colSpan={11}>
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
            </GridItem>
          </Grid>
          <Divider color="purple.100" border="1px solid" />
        </Box>
      );
    });
};
