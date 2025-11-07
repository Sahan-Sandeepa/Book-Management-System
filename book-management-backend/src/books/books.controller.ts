import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll(@Query('categoryId') categoryId?: string) {
    return this.booksService.findAll(
      categoryId ? Number(categoryId) : undefined,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() data: any) {
    return this.booksService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.booksService.update(Number(id), data);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string, @Query('force') force?: string) {
    const forceDelete = force === 'true';
    return this.booksService.delete(Number(id), forceDelete);
  }
}
