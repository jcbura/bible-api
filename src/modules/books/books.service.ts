import { books, type Testament } from '@/common/drizzle';
import { BooksResponseDto } from '@/modules/books/dtos';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class BooksService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findMany(testament?: Testament): Promise<BooksResponseDto[]> {
    return this.drizzleService.db
      .select()
      .from(books)
      .where(testament ? eq(books.testament, testament) : undefined);
  }

  async find(bookId: number): Promise<BooksResponseDto> {
    const [book] = await this.drizzleService.db
      .select()
      .from(books)
      .where(eq(books.id, bookId));

    if (!book) {
      throw new NotFoundException(`book with id ${bookId} not found`);
    }

    return book;
  }
}
