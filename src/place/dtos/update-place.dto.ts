import { Type } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

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

  @IsOptional()
  @IsString({each: true})
  uploads: string[];
}