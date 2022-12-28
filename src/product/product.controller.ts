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

import { FindProductDto } from './dto/find-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants'
import { IdValidationPipe } from '../pipes/id-validation.pipe'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get(':id')
  public async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id)

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }

    return product
  }

  @Delete(':id')
  public async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await this.productService.deleteById(id)

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
  )
  public async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateProductDto
  ) {
    const updatedProduct = await this.productService.updateById(id, dto)

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }

    return updatedProduct
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  public async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto)
  }
}
