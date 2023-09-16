import { AreaMetadata } from 'src/app.dto';

interface FindMatchingAreaParams {
  areaMetadata: AreaMetadata[];
  latLimit: number;
  longLimit: number;
  latitude: number;
  longitude: number;
}
export const findMatchingArea = ({
  areaMetadata,
  latLimit,
  longLimit,
  latitude,
  longitude,
}: FindMatchingAreaParams) => {
  return areaMetadata.find(
    ({
      label_location: { latitude: labelLatitude, longitude: labelLongitude },
    }) => {
      const isLatMatch = Math.abs(labelLatitude - latitude) <= latLimit;
      const isLongMatch = Math.abs(labelLongitude - longitude) <= longLimit;
      return isLatMatch && isLongMatch;
    },
  );
};
