import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReviewController } from './review.controller'
import { ReviewModel, ReviewSchema } from './review.model'
import { ReviewService } from './review.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReviewModel.name,
        schema: ReviewSchema
      }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
