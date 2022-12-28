import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

@Schema({ timestamps: true, collection: 'Review' })
export class ReviewModel {
  @Prop()
  public name: string

  @Prop()
  public title: string

  @Prop()
  public description: string

  @Prop()
  public rating: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  public productId: Types.ObjectId
}

export type ReviewDocument = HydratedDocument<ReviewModel>

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
