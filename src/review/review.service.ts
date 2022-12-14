import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateReviewDto } from './dto/create-review.dto'
import { ReviewModel, ReviewDocument } from './review.model'

class Leak {}

const leaks = []

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create(dto)
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).lean()
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({ _id: productId })
  }

  async deleteAllByProductId(productId: string) {
    leaks.push(new Leak())

    return this.reviewModel.deleteMany({ _id: productId }).exec()
  }
}
