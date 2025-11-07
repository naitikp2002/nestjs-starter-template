
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { COURSE_LEVEL } from '../cource.types';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  duration: number;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true, default: COURSE_LEVEL.BEGINNER })
  price: COURSE_LEVEL;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
