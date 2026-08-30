import { translations } from '@/common/drizzle';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { TranslationsResponseDto } from '@/modules/translations/dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';

@Injectable()
export class TranslationsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findMany(): Promise<TranslationsResponseDto[]> {
    return this.drizzleService.db
      .select()
      .from(translations)
      .orderBy(asc(translations.name));
  }

  async find(translationId: number): Promise<TranslationsResponseDto> {
    const [translation] = await this.drizzleService.db
      .select()
      .from(translations)
      .where(eq(translations.id, translationId))
      .orderBy(asc(translations.name));

    if (!translation) {
      throw new NotFoundException(
        `translation with id ${translationId} not found`,
      );
    }

    return translation;
  }
}
