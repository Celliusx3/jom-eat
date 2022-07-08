import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { Place, PlaceDocument } from './schemas/place.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { GetPlacesDto } from './dtos/get-places.dto';
import { User } from '../auth/entities/user.entity';
import { UpdatePlaceDto } from './dtos/update-place.dto';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place.name) private placeModel: Model<PlaceDocument>) {  }

  async createPlace(dto: CreatePlaceDto, user: User) {
    const model = {
      name: dto.title,
      description: dto.description,
      location: {
        type: 'Point',
        coordinates: [dto.lng, dto.lat]
      },
      uploads: dto.uploads,
      userId: user.uid
    }

    const createdPlace = new this.placeModel(model);

    return createdPlace.save();
  }

  async getPlaces(place: GetPlacesDto, user: User) {
    const { lat, lng } = place;

    const params = {
      userId: user.uid,
    }

    if (lat && lng) {
      Object.assign(params, { 
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat]
            },
            $maxDistance: 5000
          }
        }
      });
    }

    return this.placeModel.find(params);
  }

  async getPlaceDetails(id: ObjectId, user: User) {
    const place = await this.placeModel.findOne({
      _id: id,
      userId: user.uid,
    });
    
    if (!place) {
      throw new NotFoundException(`Place with ${id} not found.`);
    }

    return place
  }

  async deletePlace(id: ObjectId, user: User) {
    const place = await this.placeModel.findOneAndDelete({
      _id: id,
      userId: user.uid,
    });

    if (!place) {
      throw new NotFoundException(`Place with ${id} not found.`);
    }

    return place;
  }

  async updatePlace(id: ObjectId, user: User, dto: UpdatePlaceDto) {
    const { lat, lng } = dto;

    const model = {
      name: dto.title,
      description: dto.description,
      uploads: dto.uploads,
      userId: user.uid
    }

    if (lat && lng) {
      Object.assign(model, { 
        location: {
          type: 'Point',
          coordinates: [lng, lat]
        },
      });
    }

    const place = await this.placeModel.findOneAndUpdate({
      _id: id,
      userId: user.uid,
    }, model, {new: true});
    
    if (!place) {
      throw new NotFoundException(`Place with ${id} not found.`);
    }

    return place
  }
}
