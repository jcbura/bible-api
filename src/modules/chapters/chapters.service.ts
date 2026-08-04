import { books, chapters } from '@/common/drizzle';
import { ChaptersResponseDto } from '@/modules/chapters/dtos';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class ChaptersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findMany(bookId: number): Promise<ChaptersResponseDto[]> {
    return this.drizzleService.db
      .select({
        id: chapters.id,
        chapterNumber: chapters.chapterNumber,
        book: {
          id: books.id,
          name: books.name,
          testament: books.testament,
        },
      })
      .from(chapters)
      .innerJoin(books, eq(books.id, chapters.bookId))
      .where(eq(chapters.bookId, bookId));
  }

  async find(
    bookId: number,
    chapterNumber: number,
  ): Promise<ChaptersResponseDto> {
    const [chapter] = await this.drizzleService.db
      .select({
        id: chapters.id,
        chapterNumber: chapters.chapterNumber,
        book: {
          id: books.id,
          name: books.name,
          testament: books.testament,
        },
      })
      .from(chapters)
      .innerJoin(
        books,
        and(eq(books.id, chapters.bookId), eq(books.id, bookId)),
      )
      .where(eq(chapters.chapterNumber, chapterNumber));

    if (!chapter) {
      throw new NotFoundException(
        `chapter ${chapterNumber} not found for book ${bookId}`,
      );
    }

    return chapter;
  }
}
