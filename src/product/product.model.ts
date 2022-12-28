import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
class ProductCharacteristic {
  @Prop()
  public name: string

  @Prop()
  public value: string
}

const ProductCharacteristicSchema = SchemaFactory.createForClass(
  ProductCharacteristic
)

@Schema({ timestamps: true, collection: 'Product' })
export class ProductModel {
  @Prop()
  public image: string

  @Prop()
  public title: string

  @Prop()
  public price: number

  @Prop()
  public oldPrice?: number

  @Prop()
  public credit: number

  @Prop()
  public description: string

  @Prop()
  public advantages: string

  @Prop()
  public disadvantages: string

  @Prop({ type: [String] })
  public categories: string[]

  @Prop({ type: [String] })
  public tags: string[]

  @Prop({ type: [ProductCharacteristicSchema], _id: false })
  public characteristics: ProductCharacteristic[]
}

export type ProductDocument = HydratedDocument<ProductModel>

export const ProductSchema = SchemaFactory.createForClass(ProductModel)
