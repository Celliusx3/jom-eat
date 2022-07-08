import { FirebaseAuthGuard } from './../guards/firebase-auth.guard';
import { ParseObjectIdPipe } from './../pipes/object-id-validation.pipe';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { GetPlacesDto } from './dtos/get-places.dto';
import { PlaceService } from './place.service';
import { ObjectId } from 'mongoose';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { UpdatePlaceDto } from './dtos/update-place.dto';

@Controller('places')
@UseGuards(FirebaseAuthGuard)
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  createPlace(@Body() body: CreatePlaceDto, @CurrentUser() user: User) {
    return this.placeService.createPlace(body, user);
  }

  @Get()
  getPlaces(@Query() query: GetPlacesDto, @CurrentUser() user: User) {
    return this.placeService.getPlaces(query, user);
  }

  @Get('/:id')
  getPlaceDetails(@Param('id', ParseObjectIdPipe) id: ObjectId, @CurrentUser() user: User) {
    return this.placeService.getPlaceDetails(id, user);
  }

  @Delete('/:id')
  deletePlace(@Param('id', ParseObjectIdPipe) id: ObjectId, @CurrentUser() user: User) {
    return this.placeService.deletePlace(id, user);
  }

  @Patch('/:id')
  updatePlace(@Param('id', ParseObjectIdPipe) id: ObjectId, @CurrentUser() user: User, @Body() body: UpdatePlaceDto) {
    return this.placeService.updatePlace(id, user, body);
  }
}
