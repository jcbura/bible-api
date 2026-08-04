import { chapters } from '@/common/drizzle/schema/chapter.schema';
import { translations } from '@/common/drizzle/schema/translation.schema';
import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, text, unique } from 'drizzle-orm/pg-core';

export const verses = pgTable(
  'verses',
  {
    id: serial('id').primaryKey(),
    translationId: integer('translation_id')
      .notNull()
      .references(() => translations.id),
    chapterId: integer('chapter_id')
      .notNull()
      .references(() => chapters.id),
    verseNumber: integer('verse_number').notNull(),
    text: text('text').notNull(),
  },
  (table) => [
    unique('verses_chapter_translation_verse_unique').on(
      table.chapterId,
      table.translationId,
      table.verseNumber,
    ),
  ],
);

export type Verse = InferSelectModel<typeof verses>;
