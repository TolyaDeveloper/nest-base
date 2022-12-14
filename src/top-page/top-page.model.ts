import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

@Schema()
export class HhData {
  @Prop()
  public count: number

  @Prop()
  public juniorSalary: number

  @Prop()
  public middleSalary: number

  @Prop()
  public seniorSalary: number
}

const HhDataSchema = SchemaFactory.createForClass(HhData)

export class TopPageAdvantage {
  public title: string

  public description: string
}

const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage)

@Schema({ timestamps: true, collection: 'TopPage' })
export class TopPageModel {
  @Prop({ enum: TopLevelCategory })
  public firstCategory: TopLevelCategory

  @Prop()
  public secondCategory: string

  @Prop()
  public title: string

  @Prop()
  public category: string

  @Prop({ type: HhDataSchema, _id: false })
  public hh?: HhData

  @Prop({ type: [TopPageAdvantageSchema], _id: false })
  public advantages: TopPageAdvantage[]

  @Prop()
  public seoText: string

  @Prop()
  public tagsTitle: string

  @Prop({ type: [String] })
  public tags: string[]
}

export type TopPageDocument = HydratedDocument<TopPageModel>

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel)
