import { Injectable } from '@nestjs/common';
import { LatLongWithNameByFirstLetter } from 'src/app.dto';
import { AreaMetadata, LatLongWithName, ReverseGeoCodingDto } from './app.dto';
import { arrangeLocationsWithNames } from './utils/arrangeLocationsWithNames';
import { findMatchingArea } from './utils/findMatchingArea';

const INCREMENT_UNIT = 0.002;

@Injectable()
export class AppService {
  private _areaMetadata: AreaMetadata[] = [];
  private _latLimit = 0.002;
  private _longLimit = 0.002;
  private _shouldIncreaseLatOrLongLimit: 'lat' | 'long' = 'lat';

  resolveLocation(locationsWithName: LatLongWithName[]): LatLongWithName[] {
    return locationsWithName.map((locationWithName) => {
      if (locationWithName.name) {
        return locationWithName;
      }
      const { location } = locationWithName;
      const { latitude, longitude } = location;
      const areaMetadata = findMatchingArea({
        areaMetadata: this._areaMetadata,
        latLimit: this._latLimit,
        longLimit: this._longLimit,
        latitude,
        longitude,
      });
      return areaMetadata
        ? {
            ...locationWithName,
            name: areaMetadata.name,
          }
        : locationWithName; // return name as null if no matching areaMetadata
    });
  }

  increaseLatLongLimit(): void {
    if (this._shouldIncreaseLatOrLongLimit === 'lat') {
      this._latLimit += INCREMENT_UNIT;
      this._shouldIncreaseLatOrLongLimit = 'long';
    } else {
      this._longLimit += INCREMENT_UNIT;
      this._shouldIncreaseLatOrLongLimit = 'lat';
    }
  }

  reverseGeoCoding({
    areaMetadata,
    locations,
  }: ReverseGeoCodingDto): LatLongWithNameByFirstLetter {
    this._areaMetadata = areaMetadata;
    let locationsWithNames: LatLongWithName[] = locations.map((location) => ({
      name: null,
      location,
    }));
    let hasUnresolvedLocations = true;
    while (hasUnresolvedLocations) {
      locationsWithNames = this.resolveLocation(locationsWithNames);
      hasUnresolvedLocations = locationsWithNames.some(
        ({ name }) => name === null,
      );
      if (hasUnresolvedLocations) {
        this.increaseLatLongLimit();
      }
    }
    return arrangeLocationsWithNames(locationsWithNames);
  }
}
