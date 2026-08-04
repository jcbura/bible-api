import { pgEnum } from 'drizzle-orm/pg-core';

export const testamentEnum = pgEnum('testament', ['OLD', 'NEW']);

export const TestamentEnum = {
  OLD: 'OLD',
  NEW: 'NEW',
} as const;

export type Testament = (typeof testamentEnum.enumValues)[number];
