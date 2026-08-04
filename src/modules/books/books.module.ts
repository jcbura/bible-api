import { BooksController } from '@/modules/books/books.controller';
import { BooksService } from '@/modules/books/books.service';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BooksController],
  providers: [DrizzleService, BooksService],
})
export class BooksModule {}
