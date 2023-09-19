import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { DATE_FORMAT, TIME_FORMAT } from "../contants/datetime";

export type StyledDatetimeType = "date" | "time";
export interface StyledDatetimeProps {
  onChange:
    | ((value: string | moment.Moment, type: StyledDatetimeType) => void)
    | undefined;
  value: string | undefined;
  type: StyledDatetimeType;
  label: string;
}

export const StyledDatetime = ({
  onChange,
  value,
  type,
  label,
}: StyledDatetimeProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Box data-testid={`styled-datetime-${type}`}>
        <Datetime
          dateFormat={type === "time" ? false : DATE_FORMAT}
          timeFormat={type === "date" ? false : TIME_FORMAT}
          onChange={(value) => onChange?.(value, type)}
          renderInput={(_, openCalendar) => (
            <Input
              data-testid={`styled-datetime-input-${type}`}
              w="100%"
              bg="white"
              mr="4"
              onFocus={() => openCalendar()}
              placeholder={`Select ${type}...`}
              value={value ?? ""}
              readOnly
            />
          )}
        />
      </Box>
    </FormControl>
  );
};
