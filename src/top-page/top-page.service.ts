import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTopPageDto } from './dto/create-top-page.dto'

import {
  TopPageModel,
  TopPageDocument,
  TopLevelCategory
} from './top-page.model'

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name) private topPageModel: Model<TopPageDocument>
  ) {}

  public async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto)
  }

  public async findById(id: string) {
    return this.topPageModel.findById(id)
  }

  public async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias })
  }

  public async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel.find(
      { firstCategory },
      { alias: 1, secondCategory: 1, title: 1 }
    )
  }

  public async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id)
  }

  public async updatedById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true })
  }
}
