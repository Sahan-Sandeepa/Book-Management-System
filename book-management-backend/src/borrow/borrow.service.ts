import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(userId: number, bookId: number) {
    // Check if book exists
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');

    // Check stock availability
    if (book.stock <= 0) {
      throw new BadRequestException('Book is out of stock');
    }

    // Check if user borrowed this book and hasn’t returned it
    const existingRecord = await this.prisma.borrowRecord.findFirst({
      where: { userId, bookId, isReturned: false },
    });
    if (existingRecord) {
      throw new BadRequestException(
        'User already borrowed this book and has not returned it',
      );
    }

    // Create a new borrow record
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2-week borrowing period

    const borrowRecord = await this.prisma.borrowRecord.create({
      data: {
        userId,
        bookId,
        dueDate,
      },
    });

    // Decrease stock
    await this.prisma.book.update({
      where: { id: bookId },
      data: { stock: { decrement: 1 } },
    });

    return {
      message: 'Book borrowed successfully',
      borrowRecord,
    };
  }

  async returnBook(userId: number, bookId: number) {
    // Find existing borrow record
    const record = await this.prisma.borrowRecord.findFirst({
      where: { userId, bookId, isReturned: false },
    });
    if (!record) {
      throw new NotFoundException(
        'No active borrow record found for this user and book',
      );
    }

    // Mark as returned
    await this.prisma.borrowRecord.update({
      where: { id: record.id },
      data: {
        isReturned: true,
        returnDate: new Date(),
      },
    });

    // Increase stock
    await this.prisma.book.update({
      where: { id: bookId },
      data: { stock: { increment: 1 } },
    });

    return { message: 'Book returned successfully' };
  }

  // List all borrowed books of a user
  async getUserBorrowedBooks(userId: number) {
    return this.prisma.borrowRecord.findMany({
      where: { userId, isReturned: false },
      include: { book: true },
    });
  }
}
