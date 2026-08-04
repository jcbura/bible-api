import { config } from '@/config';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/common/drizzle/migrations',
  schema: './src/common/drizzle/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.database.url,
  },
});
