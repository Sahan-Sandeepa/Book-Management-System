import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [PrismaModule, BooksModule, CategoriesModule, BorrowModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
