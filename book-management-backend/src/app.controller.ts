import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { BorrowService } from './borrow/borrow.service';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return { status: 'ok', message: 'Server is running' };
  }
}

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post()
  borrow(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.borrowBook(body.userId, body.bookId);
  }

  @Post('return')
  return(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.returnBook(body.userId, body.bookId);
  }
}
