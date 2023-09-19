import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class LatLong {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class AreaMetadata {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => LatLong)
  label_location: LatLong;
}

export class ReverseGeoCodingDto {
  @ValidateNested({ each: true })
  @Type(() => AreaMetadata)
  areaMetadata: AreaMetadata[];

  @ValidateNested({ each: true })
  @Type(() => LatLong)
  locations: LatLong[];
}

export interface LatLongWithName {
  name: string | null;
  location: LatLong;
}
export interface LatLongWithNameByFirstLetter {
  [key: string]: LatLongWithName[];
}
