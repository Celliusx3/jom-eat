import mongoose from "mongoose";

export const pointSchema = new mongoose.Schema ({
  type: {
    type: String,
    enum: ['Point'], 
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  }
})