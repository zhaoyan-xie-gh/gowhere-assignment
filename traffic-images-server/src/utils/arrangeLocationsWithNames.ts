import { sortBy, upperFirst } from 'lodash';
import { LatLongWithName, LatLongWithNameByFirstLetter } from 'src/app.dto';

export const arrangeLocationsWithNames = (
  locationsWithName: LatLongWithName[],
): LatLongWithNameByFirstLetter => {
  const locationsByFirstLetter = locationsWithName.reduce(
    (
      acc: LatLongWithNameByFirstLetter,
      { name, location: { latitude, longitude } },
    ) => {
      const firstLetter = name[0].toUpperCase();
      const existingLocations = acc[firstLetter] ?? [];
      return {
        ...acc,
        [firstLetter]: [
          ...existingLocations,
          {
            name: appendIndexToName(name, existingLocations),
            location: { latitude, longitude },
          },
        ],
      };
    },
    {} as LatLongWithNameByFirstLetter,
  );

  return Object.entries(locationsByFirstLetter).reduce(
    (acc, [key, locations]) => {
      return {
        ...acc,
        [key]: sortBy(locations, 'name'),
      };
    },
    {} as LatLongWithNameByFirstLetter,
  );
};

const appendIndexToName = (
  originalName: string,
  locations: LatLongWithName[],
) => {
  const locationsWithSameName = locations.filter(
    ({ name }) => name?.includes(originalName),
  );
  return locationsWithSameName.length >= 1
    ? `${upperFirst(originalName)} [${++locationsWithSameName.length}]`
    : upperFirst(originalName);
};
