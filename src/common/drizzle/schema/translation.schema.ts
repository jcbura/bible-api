import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, unique } from 'drizzle-orm/pg-core';

export const translations = pgTable(
  'translations',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
  },
  (table) => [unique('translations_name_unique').on(table.name)],
);

export type Translation = InferSelectModel<typeof translations>;
