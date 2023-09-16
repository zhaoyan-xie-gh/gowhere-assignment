export interface LatLong {
  latitude: number;
  longitude: number;
}
export interface AreaMetadata {
  name: string;
  label_location: LatLong;
}
export interface ReverseGeoCodingDto {
  areaMetadata: AreaMetadata[];
  locations: LatLong[];
}
export interface LatLongWithName {
  name: string | null;
  location: LatLong;
}
export interface LatLongWithNameByFirstLetter {
  [key: string]: LatLongWithName[];
}
