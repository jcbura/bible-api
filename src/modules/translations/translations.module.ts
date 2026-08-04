import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { TranslationsController } from '@/modules/translations/translations.controller';
import { TranslationsService } from '@/modules/translations/translations.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TranslationsController],
  providers: [DrizzleService, TranslationsService],
})
export class TranslationsModule {}
