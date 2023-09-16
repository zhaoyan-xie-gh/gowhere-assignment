import { Box, Flex } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { InfoAlert } from "../../components/InfoAlert";
import {
  StyledDatetime,
  StyledDatetimeType,
} from "../../components/StyledDatetime";
import { DATE_FORMAT, TIME_FORMAT } from "./contants/datetime";
import { useGetTrafficImages } from "./queries/useGetTrafficImages";
import { DatetimeInput } from "./types";
import { transformDatetimeInputToTrafficImagesParams } from "./utils/transformDatetimeInputToTrafficImagesParams";

export default function TrafficImages() {
  const [datetime, setDatetime] = useState<DatetimeInput>({
    date: undefined,
    time: undefined,
  });

  const formattedDate = datetime.date;

  const { data } = useGetTrafficImages({
    datetime: transformDatetimeInputToTrafficImagesParams(datetime),
  });

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
        title={"Date-Time Selection:"}
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
    </Box>
  );
}
