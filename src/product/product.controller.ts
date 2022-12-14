import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { FindProductDto } from './dto/find-product.dto'
import { ProductModel } from './product.model'

@Controller('product')
export class ProductController {
  @Post('create')
  public async create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  public async get(@Param('id') id: string) {}

  @Delete(':id')
  public async delete(@Param('id') id: string) {}

  @Patch(':id')
  public async patch(@Param('id') id: string, @Body() dto: ProductModel) {}

  @HttpCode(200)
  @Post()
  public async find(@Body() dto: FindProductDto) {}
}
