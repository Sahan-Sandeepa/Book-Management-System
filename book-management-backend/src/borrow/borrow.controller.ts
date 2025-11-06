import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  async borrow(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.borrowBook(body.userId, body.bookId);
  }

  @Post('return')
  async returnBook(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.returnBook(body.userId, body.bookId);
  }

  @Get('user/:userId')
  async getUserBorrowedBooks(@Param('userId') userId: string) {
    return this.borrowService.getUserBorrowedBooks(Number(userId));
  }
}
