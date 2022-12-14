import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({ timestamps: true, collection: 'Auth' })
export class AuthModel {
  @Prop({ required: true, unique: true })
  public email: string

  @Prop({ required: true })
  public passwordHash: string
}

export type AuthDocument = HydratedDocument<AuthModel>

export const AuthSchema = SchemaFactory.createForClass(AuthModel)
