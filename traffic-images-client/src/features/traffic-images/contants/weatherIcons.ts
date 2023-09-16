import { IconType } from "react-icons";
import {
  RiCloudyLine,
  RiHeavyShowersLine,
  RiMoonCloudyLine,
  RiShowersLine,
  RiSunCloudyLine,
  RiThunderstormsLine,
  RiWindyLine,
} from "react-icons/ri";

export const weatherIcons: { [forecast: string]: IconType } = {
  "Fair (Day)": RiSunCloudyLine,
  "Fair (Night)": RiMoonCloudyLine,
  Windy: RiWindyLine,
  "Partly Cloudy (Day)": RiSunCloudyLine,
  "Partly Cloudy (Night)": RiMoonCloudyLine,
  "Light Showers": RiShowersLine,
  Showers: RiHeavyShowersLine,
  Cloudy: RiCloudyLine,
  "Thundery Showers": RiThunderstormsLine,
  "Heavy Thundery Showers": RiThunderstormsLine,
  "Moderate Rain": RiHeavyShowersLine,
};
