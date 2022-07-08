import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @IsOptional()
  @IsString({each: true})
  uploads: string[];
}