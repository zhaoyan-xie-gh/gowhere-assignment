import { weatherIcons } from "@/features/traffic-images/contants/weatherIcons";
import { useLocationSelection } from "@/features/traffic-images/contexts/location-selection-context";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import { WeatherForecast2HResponseItem } from "../types";

interface WeatherForecastWidgetProps {
  weatherData: WeatherForecast2HResponseItem | undefined;
}

const DATE_FORMAT = "YYYY-MM-DD, hh:mm";

export const WeatherForecastWidget = ({
  weatherData,
}: WeatherForecastWidgetProps) => {
  const { selectedLocation } = useLocationSelection();

  /* --------------------------- 2H Weather Forecast -------------------------- */
  const locationForecast = weatherData?.forecasts?.find(
    ({ area }) => selectedLocation?.name?.includes(area)
  )?.forecast;
  const startPeriod = weatherData?.valid_period.start;
  const endPeriod = weatherData?.valid_period.end;
  const formattedStartPeriod = startPeriod
    ? moment(startPeriod).format(DATE_FORMAT)
    : undefined;
  const formattedEndPeriod = endPeriod
    ? moment(endPeriod).format(DATE_FORMAT)
    : undefined;

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      bg="gray.100"
      minW="23rem"
      mt={{ base: "6", md: "4" }}
      p="4"
      h="fit-content"
    >
      <Flex>
        {locationForecast && weatherIcons[locationForecast] && (
          <Icon as={weatherIcons[locationForecast]} mr="2" fontSize="2xl" />
        )}
        <Heading size="sm">2-hour weather forecast</Heading>
      </Flex>
      {locationForecast ? (
        <>
          {formattedStartPeriod && formattedEndPeriod && (
            <Flex alignContent="center">
              <Text fontSize="sm" fontWeight="bold" color="gray.500">
                {formattedStartPeriod}
              </Text>
              <Text fontSize="sm" px="1" color="gray.500">
                to
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.500">
                {formattedEndPeriod}
              </Text>
            </Flex>
          )}
          <Text fontSize="lg">{locationForecast}</Text>
        </>
      ) : (
        <Text>No data</Text>
      )}
    </Box>
  );
};
