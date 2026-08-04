import {
  BaseArrayTranslationsResponseDto,
  BaseTranslationsResponseDto,
  TranslationsResponseDto,
} from '@/modules/translations/dtos';
import { TranslationsService } from '@/modules/translations/translations.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @ApiOperation({ summary: 'Get translations' })
  @ApiOkResponse({ type: BaseArrayTranslationsResponseDto })
  @Get()
  async findMany(): Promise<TranslationsResponseDto[]> {
    return this.translationsService.findMany();
  }

  @ApiOperation({ summary: 'Get translation' })
  @ApiOkResponse({ type: BaseTranslationsResponseDto })
  @Get(':translationId')
  async find(
    @Param('translationId', ParseIntPipe) translationId: number,
  ): Promise<TranslationsResponseDto> {
    return this.translationsService.find(translationId);
  }
}
