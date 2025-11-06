import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { BorrowModule } from './borrow/borrow.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    BooksModule,
    CategoriesModule,
    BorrowModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
