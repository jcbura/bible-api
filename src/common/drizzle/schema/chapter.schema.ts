import { books } from '@/common/drizzle/schema/book.schema';
import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, unique } from 'drizzle-orm/pg-core';

export const chapters = pgTable(
  'chapters',
  {
    id: serial('id').primaryKey(),
    bookId: integer('book_id')
      .notNull()
      .references(() => books.id),
    chapterNumber: integer('chapter_number').notNull(),
  },
  (table) => [
    unique('chapters_book_chapter_unique').on(
      table.bookId,
      table.chapterNumber,
    ),
  ],
);

export type Chapter = InferSelectModel<typeof chapters>;
