import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.bookCategory.findMany();
  }
}

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(
    userId: number,
    bookId: number,
  ): Promise<{ message: string }> {
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2-week due date

    if (!book) throw new BadRequestException('Book not found');

    if (book.stock <= 0) throw new BadRequestException('Out of stock');

    await this.prisma.$transaction([
      this.prisma.book.update({
        where: { id: bookId },
        data: { stock: { decrement: 1 } },
      }),

      this.prisma.borrowRecord.create({
        data: { userId, bookId, dueDate },
      }),
    ]);

    return { message: 'Book borrowed successfully' };
  }

  async returnBook(
    userId: number,
    bookId: number,
  ): Promise<{ message: string }> {
    const activeRecord = await this.prisma.borrowRecord.findFirst({
      where: { userId, bookId, isReturned: false },
    });

    if (!activeRecord) throw new BadRequestException('No active borrow found');

    await this.prisma.$transaction([
      this.prisma.book.update({
        where: { id: bookId },
        data: { stock: { increment: 1 } },
      }),

      this.prisma.borrowRecord.updateMany({
        where: { userId, bookId, isReturned: false },
        data: { isReturned: true, returnDate: new Date() },
      }),
    ]);

    return { message: 'Book returned successfully' };
  }
}
