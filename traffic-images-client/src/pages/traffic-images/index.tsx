import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { InfoAlert } from "../../components/InfoAlert";
import {
  StyledDatetime,
  StyledDatetimeType,
} from "../../components/StyledDatetime";
import { useGetTwoHourWeatherForecast } from "../weather-forecast/queries/useGetTwoHourWeatherForecast";
import { LocationsSection } from "./components/LocationsSection";
import { Screenshot } from "./components/Screenshot";
import { DATE_FORMAT, TIME_FORMAT } from "./contants/datetime";
import { LocationSelectionProvider } from "./contexts/location-selection-context";
import { useGetTrafficImages } from "./queries/useGetTrafficImages";
import { DatetimeInput } from "./types";
import { arrangeLocationsWithNames } from "./utils/arrangeLocationsWithNames";
import { reverseGeoCoding } from "./utils/reverseGeoCoding";
import { transformDatetimeInputToTrafficImagesParams } from "./utils/transformDatetimeInputToTrafficImagesParams";

export default function TrafficImages() {
  const [datetime, setDatetime] = useState<DatetimeInput>({
    date: undefined,
    time: undefined,
  });

  const { data: trafficData } = useGetTrafficImages({
    datetime: transformDatetimeInputToTrafficImagesParams(datetime),
  });
  const locations = trafficData?.items.flatMap(({ cameras }) =>
    cameras.map(({ location }) => location)
  );

  const { data } = useGetTwoHourWeatherForecast();
  const areaMetadata = data?.area_metadata;

  const geocodeReversed = reverseGeoCoding(locations, areaMetadata);
  const locationsByFirstLetter = geocodeReversed
    ? arrangeLocationsWithNames(geocodeReversed)
    : undefined;

  const onDatetimeChange = (
    value: string | moment.Moment,
    type: StyledDatetimeType
  ) => {
    if (type === "date") {
      const formattedValue = moment.isMoment(value)
        ? value.format(DATE_FORMAT)
        : value;
      setDatetime((prev) => ({ ...prev, date: formattedValue }));
    } else {
      const formattedValue = moment.isMoment(value)
        ? value.format(TIME_FORMAT)
        : value;
      setDatetime((prev) => ({ ...prev, time: formattedValue }));
    }
  };

  return (
    <Box>
      <InfoAlert
        status="info"
        message={
          "Pick a date-time to retrieve data at that moment, or the latest will be retrieved every two minutes."
        }
      />
      <Flex>
        <StyledDatetime
          onChange={onDatetimeChange}
          value={datetime.date}
          type="date"
          label="Select a date"
        />
        <StyledDatetime
          onChange={onDatetimeChange}
          value={datetime.time}
          type="time"
          label="Select a time"
        />
      </Flex>
      <LocationSelectionProvider>
        <Grid templateColumns={"repeat(4, 1fr)"} my="6">
          <GridItem colSpan={3}>
            <LocationsSection locationsByFirstLetter={locationsByFirstLetter} />
            <Screenshot trafficData={trafficData} />
          </GridItem>
          <GridItem></GridItem>
        </Grid>
      </LocationSelectionProvider>
    </Box>
  );
}
