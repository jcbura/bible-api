import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { BooksLiteResponseDto } from '@/modules/books/dtos/books-response.dto';
import { ChaptersLiteResponseDto } from '@/modules/books/dtos/chapters-response.dto';
import { TranslationsResponseDto } from '@/modules/translations/dtos/translations-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class VersesResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Number, example: 1 })
  verseNumber: number;

  @ApiProperty({
    type: String,
    example: 'In the beginning God created the heavens and the earth.',
  })
  text: string;

  @ApiProperty({ type: () => TranslationsResponseDto })
  translation: TranslationsResponseDto;

  @ApiProperty({ type: () => ChaptersLiteResponseDto })
  chapter: ChaptersLiteResponseDto;

  @ApiProperty({ type: () => BooksLiteResponseDto })
  book: BooksLiteResponseDto;
}

export class BaseVersesResponseDto extends withBaseResponse(
  VersesResponseDto,
) {}
export class BaseArrayVersesResponseDto extends withBaseArrayResponse(
  VersesResponseDto,
) {}
