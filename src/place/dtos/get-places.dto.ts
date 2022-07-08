import { Type } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, ValidateIf } from "class-validator";

export class GetPlacesDto {
  @IsNumber()
  @IsLatitude()
  @ValidateIf(o => o.lng !== undefined)
  @Type(() => Number)
  lat?: number;

  @IsNumber()
  @IsLongitude()
  @ValidateIf(o => o.lat !== undefined)
  @Type(() => Number)
  lng?: number;
}