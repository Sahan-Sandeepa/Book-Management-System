import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.categoriesService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: { name: string; description?: string }) {
    return this.categoriesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string },
  ) {
    return this.categoriesService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(Number(id));
  }
}
