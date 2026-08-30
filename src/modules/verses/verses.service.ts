import { books, chapters, translations, verses } from '@/common/drizzle';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { VersesResponseDto } from '@/modules/verses/dtos';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, eq, gte, lte, SQL } from 'drizzle-orm';

@Injectable()
export class VersesService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findMany(
    bookId: number,
    chapterNumber: number,
    translation: string,
    start?: number,
    end?: number,
  ): Promise<VersesResponseDto[]> {
    if (start !== undefined && end !== undefined && start > end) {
      throw new BadRequestException('start must be less than end');
    }

    const conditions: SQL[] = [];
    if (start !== undefined) conditions.push(gte(verses.verseNumber, start));
    if (end !== undefined) conditions.push(lte(verses.verseNumber, end));

    return this.drizzleService.db
      .select({
        id: verses.id,
        verseNumber: verses.verseNumber,
        text: verses.text,
        translation: {
          id: translations.id,
          name: translations.name,
        },
        chapter: {
          id: chapters.id,
          chapterNumber: chapters.chapterNumber,
        },
        book: {
          id: books.id,
          name: books.name,
          testament: books.testament,
        },
      })
      .from(verses)
      .innerJoin(
        chapters,
        and(
          eq(chapters.id, verses.chapterId),
          eq(chapters.chapterNumber, chapterNumber),
        ),
      )
      .innerJoin(
        books,
        and(eq(books.id, chapters.bookId), eq(books.id, bookId)),
      )
      .innerJoin(
        translations,
        and(
          eq(translations.id, verses.translationId),
          eq(translations.name, translation),
        ),
      )
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(verses.verseNumber));
  }

  async find(
    bookId: number,
    chapterNumber: number,
    verseNumber: number,
    translation: string,
  ): Promise<VersesResponseDto> {
    const [verse] = await this.drizzleService.db
      .select({
        id: verses.id,
        verseNumber: verses.verseNumber,
        text: verses.text,
        translation: {
          id: translations.id,
          name: translations.name,
        },
        chapter: {
          id: chapters.id,
          chapterNumber: chapters.chapterNumber,
        },
        book: {
          id: books.id,
          name: books.name,
          testament: books.testament,
        },
      })
      .from(verses)
      .innerJoin(
        chapters,
        and(
          eq(chapters.id, verses.chapterId),
          eq(chapters.chapterNumber, chapterNumber),
        ),
      )
      .innerJoin(
        books,
        and(eq(books.id, chapters.bookId), eq(books.id, bookId)),
      )
      .innerJoin(
        translations,
        and(
          eq(translations.id, verses.translationId),
          eq(translations.name, translation),
        ),
      )
      .where(eq(verses.verseNumber, verseNumber))
      .orderBy(asc(verses.verseNumber));

    if (!verse) {
      throw new NotFoundException(
        `verse ${verseNumber} in chapter ${chapterNumber} not found for book ${bookId}`,
      );
    }

    return verse;
  }
}
