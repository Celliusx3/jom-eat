import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { Place, PlaceSchema } from './schemas/place.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])],
  controllers: [PlaceController],
  providers: [PlaceService]
})
export class PlaceModule {}
