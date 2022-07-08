import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { pointSchema } from "./point.schema";

export type PlaceDocument = Place & Document;

interface Point {
  type: "Point";
  coordinates: number[];
}

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})

export class Place {
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  description: string;

  @Prop({
    type: pointSchema,
    required: true
  })
  location: Point;

  @Prop({
    type:[String]
  })
  uploads: string[];

  @Prop({
    type: String,
    required: true 
  })
  userId: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place).index({location: '2dsphere'});