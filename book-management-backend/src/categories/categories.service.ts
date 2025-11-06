import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.bookCategory.findMany({
      include: {
        _count: {
          select: { books: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.bookCategory.findUnique({
      where: { id },
      include: { books: true },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(data: Prisma.BookCategoryCreateInput) {
    return this.prisma.bookCategory.create({ data });
  }

  async update(id: number, data: Prisma.BookCategoryUpdateInput) {
    return this.prisma.bookCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.bookCategory.delete({ where: { id } });
  }
}
