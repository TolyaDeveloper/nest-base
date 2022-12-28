import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { CreateTopPageDto } from './dto/create-top-page.dto'
import { FindTopPageDto } from './dto/find-top-page.dto'
import { TopPageService } from './top-page.service'
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants'

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  public async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @Get(':id')
  public async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id)

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }

    return page
  }

  @Get('byAlias/:alias')
  public async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias)

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }

    return page
  }

  @Delete(':id')
  public async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPage = await this.topPageService.deleteById(id)

    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }
  }

  @Patch(':id')
  public async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updatedPage = await this.topPageService.updatedById(id, dto)

    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }

    return updatedPage
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  public async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory)
  }
}
