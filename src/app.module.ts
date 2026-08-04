import { BooksModule } from '@/modules/books/books.module';
import { ChaptersModule } from '@/modules/chapters/chapters.module';
import { DrizzleModule } from '@/modules/drizzle/drizzle.module';
import { TranslationsModule } from '@/modules/translations/translations.module';
import { VersesModule } from '@/modules/verses/verses.module';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 3,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 20,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    DrizzleModule,
    BooksModule,
    ChaptersModule,
    TranslationsModule,
    VersesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
