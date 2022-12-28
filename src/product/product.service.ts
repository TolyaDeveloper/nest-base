import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDto } from './dto/find-product.dto'
import { ProductModel, ProductDocument } from './product.model'
import { ReviewModel } from '../review/review.model'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>
  ) {}

  public async create(dto: CreateProductDto) {
    return this.productModel.create(dto)
  }

  public async findById(id: string) {
    return this.productModel.findById(id)
  }

  public async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }

  public async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true })
  }

  public async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category
          }
        },
        {
          $sort: {
            _id: 1
          }
        },
        {
          $limit: dto.limit
        },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews'
          }
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' }
          }
        }
      ])
      .exec() as Promise<
      (ProductModel & {
        review: ReviewModel[]
        reviewCount: number
        reviewAvg: number
      })[]
    >
  }
}
