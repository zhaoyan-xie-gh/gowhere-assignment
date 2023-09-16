import { InfoAlert } from "@/components/InfoAlert";
import { LocationsSection } from "@/features/traffic-images/components/LocationsSection";
import { Screenshot } from "@/features/traffic-images/components/Screenshot";
import {
  StyledDatetime,
  StyledDatetimeType,
} from "@/features/traffic-images/components/StyledDatetime";
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "@/features/traffic-images/contants/datetime";
import { LocationSelectionProvider } from "@/features/traffic-images/contexts/location-selection-context";
import { useGetTrafficImages } from "@/features/traffic-images/queries/useGetTrafficImages";
import { DatetimeInput } from "@/features/traffic-images/types";
import { arrangeLocationsWithNames } from "@/features/traffic-images/utils/arrangeLocationsWithNames";
import { reverseGeoCoding } from "@/features/traffic-images/utils/reverseGeoCoding";
import { transformDatetimeInputToTrafficImagesParams } from "@/features/traffic-images/utils/transformDatetimeInputToTrafficImagesParams";
import { WeatherForecastWidget } from "@/features/weather-forecast/components/WeatherForecastWidget";
import { useGetTwoHourWeatherForecast } from "@/features/weather-forecast/queries/useGetTwoHourWeatherForecast";
import { Box, Button, Flex } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";

export default function TrafficImages() {
  const [datetime, setDatetime] = useState<DatetimeInput>({
    date: undefined,
    time: undefined,
  });

  const transformedDatetime =
    transformDatetimeInputToTrafficImagesParams(datetime);
  const { data: trafficData } = useGetTrafficImages({
    datetime: transformedDatetime,
  });
  const locations = trafficData?.items.flatMap(({ cameras }) =>
    cameras.map(({ location }) => location)
  );

  const { data: weather2HData } = useGetTwoHourWeatherForecast({
    datetime: transformedDatetime,
  });
  const areaMetadata = weather2HData?.area_metadata;

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
  const onDatetimeClear = () => {
    setDatetime({ date: undefined, time: undefined });
  };

  return (
    <Box>
      <InfoAlert
        status="info"
        message="Pick a date-time to retrieve data at that moment, or the latest will be retrieved every two minutes."
      />
      <Flex
        alignItems={{ md: "end" }}
        flexDir={{ base: "column", md: "row" }}
        gap="4"
      >
        <Flex gap="2" w="100%">
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
        <Button
          onClick={onDatetimeClear}
          mt={{ base: 2, md: 0 }}
          variant="outline"
          colorScheme="blue"
        >
          Clear
        </Button>
      </Flex>

      <LocationSelectionProvider>
        <Flex flexDir={{ base: "column", md: "row-reverse" }} gap="6">
          <WeatherForecastWidget weatherData={weather2HData?.items[0]} />
          <Box>
            <LocationsSection locationsByFirstLetter={locationsByFirstLetter} />
            <Screenshot trafficData={trafficData} />
          </Box>
        </Flex>
      </LocationSelectionProvider>
    </Box>
  );
}
