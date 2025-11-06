import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post('borrow-book')
  async borrowBook(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.borrowBook(body.userId, body.bookId);
  }

  @Post('return-book')
  async returnBook(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.returnBook(body.userId, body.bookId);
  }

  @Get('user/:userId')
  async getUserBorrowedBooks(@Param('userId') userId: string) {
    return this.borrowService.getUserBorrowedBooks(Number(userId));
  }
}
