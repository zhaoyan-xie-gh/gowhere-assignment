import { AreaMetadata } from "../../../features/weather-forecast/types";
import { LatLong, LatLongWithName } from "../types";

/*
  Assumption: Reverse geo-coding is performed by deriving the differences of the latitude and longitude
  of the LTA's camera and NEA's camera, ensuring they remain within specified constraints..
*/

const LAT_BOUNDARY_LIMIT = 0.02;
const LONG_BOUNDARY_LIMIT = 0.035;

export const reverseGeoCoding = (
  locations: LatLong[] | undefined,
  areaMetadata: AreaMetadata[] | undefined
): LatLongWithName[] | undefined => {
  if (!locations || !areaMetadata) return undefined;

  return locations.map(({ latitude, longitude }): LatLongWithName => {
    const matchedArea = areaMetadata.find(
      ({
        label_location: { latitude: areaLatitude, longitude: areaLongitude },
      }) =>
        isDifferenceWithinLimit(areaLatitude, latitude, LAT_BOUNDARY_LIMIT) &&
        isDifferenceWithinLimit(areaLongitude, longitude, LONG_BOUNDARY_LIMIT)
    );
    return {
      name: matchedArea ? matchedArea.name : null,
      location: { longitude, latitude },
    };
  });
};

const isDifferenceWithinLimit = (
  first: number,
  second: number,
  limit: number
): boolean => Math.abs(first - second) <= limit;
