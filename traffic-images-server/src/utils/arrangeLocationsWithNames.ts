import { sortBy } from 'lodash';
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
            name,
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
        [key]: appendIndexToName(sortBy(locations, 'name')),
      };
    },
    {} as LatLongWithNameByFirstLetter,
  );
};

const appendIndexToName = (
  locationsWithName: LatLongWithName[],
): LatLongWithName[] => {
  let counter = 1;
  return locationsWithName.map(({ name, location }, i) => {
    if (i === 0) {
      return { name, location };
    }

    const prevName = locationsWithName[i - 1].name;
    if (name === prevName) {
      return { name: `${name} [${counter++ + 1}]`, location };
    }
    counter = 1;
    return { name, location };
  });
};
