import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "@/pages/traffic-images/contants/datetime";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export type StyledDatetimeType = "date" | "time";
interface StyledDatetimeProps {
  onChange:
    | ((value: string | moment.Moment, type: StyledDatetimeType) => void)
    | undefined;
  value: string | undefined;
  type: StyledDatetimeType;
  label: string;
}

const MIN_INPUT_WIDTH = "300";

export const StyledDatetime = ({
  onChange,
  value,
  type,
  label,
}: StyledDatetimeProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Datetime
        dateFormat={type === "time" ? false : DATE_FORMAT}
        timeFormat={type === "date" ? false : TIME_FORMAT}
        onChange={(value) => onChange?.(value, type)}
        renderInput={(_, openCalendar) => (
          <Flex justifyContent="center" alignItems="center">
            <Input
              minW={MIN_INPUT_WIDTH}
              bg="white"
              mr="4"
              onFocus={() => openCalendar()}
              placeholder={`Select ${type}...`}
              value={value ?? ""}
              readOnly
            />
          </Flex>
        )}
      />
    </FormControl>
  );
};
