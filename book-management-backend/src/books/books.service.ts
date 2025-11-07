/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoryId?: number) {
    return await this.prisma.book.findMany({
      where: categoryId ? { bookCategoryId: categoryId } : {},
      include: { bookCategory: true },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { bookCategory: true },
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async create(data: Prisma.BookCreateInput) {
    try {
      return await this.prisma.book.create({ data });
    } catch (error) {
      throw new BadRequestException(`Failed to create book: ${error.message}`);
    }
  }

  async update(id: number, data: Prisma.BookUpdateInput) {
    try {
      return await this.prisma.book.update({ where: { id }, data });
    } catch (error) {
      throw new BadRequestException(`Failed to update book: ${error.message}`);
    }
  }

  async delete(id: number, forceDelete = false) {
    try {
      // Count all borrow records for this book
      const borrowCount = await this.prisma.borrowRecord.count({
        where: { bookId: id },
      });

      // If there are borrow records and user has not confirmed deletion
      if (borrowCount > 0 && !forceDelete) {
        return {
          message:
            'This book has borrow records. Do you want to delete it along with all related records?',
          requiresConfirmation: true,
        };
      }

      // If user confirmed, delete borrow records first
      if (borrowCount > 0 && forceDelete) {
        await this.prisma.borrowRecord.deleteMany({ where: { bookId: id } });
      }
      return await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`Failed to delete book: ${error.message}`);
    }
  }
}
