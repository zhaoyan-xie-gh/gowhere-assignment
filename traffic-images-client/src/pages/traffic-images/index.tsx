import { Box, Flex, Wrap } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { InfoAlert } from "../../components/InfoAlert";
import {
  StyledDatetime,
  StyledDatetimeType,
} from "../../components/StyledDatetime";
import { useGetTwoHourWeatherForecast } from "../weather-forecast/queries/useGetTwoHourWeatherForecast";
import { LocationCard } from "./components/LocationCard";
import { DATE_FORMAT, TIME_FORMAT } from "./contants/datetime";
import { useGetTrafficImages } from "./queries/useGetTrafficImages";
import { DatetimeInput } from "./types";
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

  const locationsWithNames = reverseGeoCoding(locations, areaMetadata);
  // TODO: continue here

  const handleDatetimeChange = (
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
          "Pick a date-time to retrieve data at that moment, or the latest will be retrieved every minute."
        }
      />
      <Flex>
        <StyledDatetime
          onChange={handleDatetimeChange}
          value={datetime.date}
          type="date"
          label="Select a date"
        />
        <StyledDatetime
          onChange={handleDatetimeChange}
          value={datetime.time}
          type="time"
          label="Select a time"
        />
      </Flex>
      <Wrap
        my="4"
        maxH="300"
        border="1px solid"
        borderColor="gray.300"
        overflowY="scroll"
        bg="gray.100"
        p="2"
      >
        {locations?.map(({ latitude, longitude }) => (
          <LocationCard
            key={`${latitude}-${longitude}`}
            location={{ latitude, longitude }}
            areaMetadata={areaMetadata}
          />
        ))}
      </Wrap>
    </Box>
  );
}
