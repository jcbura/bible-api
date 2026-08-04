import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { BooksLiteResponseDto } from '@/modules/books/dtos/books-response.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class ChaptersResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Number, example: 1 })
  chapterNumber: number;

  @ApiProperty({ type: () => BooksLiteResponseDto })
  book: BooksLiteResponseDto;
}

export class ChaptersLiteResponseDto extends OmitType(ChaptersResponseDto, [
  'book',
] as const) {}

export class BaseChaptersResponseDto extends withBaseResponse(
  ChaptersResponseDto,
) {}
export class BaseArrayChaptersResponseDto extends withBaseArrayResponse(
  ChaptersResponseDto,
) {}
