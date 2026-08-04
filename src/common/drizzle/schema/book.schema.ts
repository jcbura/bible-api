import { testamentEnum } from '@/common/drizzle/schema/enums';
import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, text, unique } from 'drizzle-orm/pg-core';

export const books = pgTable(
  'books',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    testament: testamentEnum('testament').notNull(),
    bookOrder: integer('book_order').notNull(),
  },
  (table) => [
    unique('books_name_unique').on(table.name),
    unique('books_order_unique').on(table.bookOrder),
  ],
);

export type Book = InferSelectModel<typeof books>;
