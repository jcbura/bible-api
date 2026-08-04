import { pgEnum } from 'drizzle-orm/pg-core';

export const testamentEnum = pgEnum('testament', ['OLD', 'NEW']);

export type Testament = (typeof testamentEnum.enumValues)[number];
