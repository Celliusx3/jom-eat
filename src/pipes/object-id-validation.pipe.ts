import { BadRequestException, PipeTransform } from "@nestjs/common";
import mongoose from "mongoose";

export class ParseObjectIdPipe implements PipeTransform<any, mongoose.Types.ObjectId> {
  transform(value: any): mongoose.Types.ObjectId {
    const validObjectId = mongoose.Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException(`Invalid ObjectId: ${value}`);
    }

    // @ts-ignore
    return mongoose.Types.ObjectId.createFromHexString(value); 
  }
}