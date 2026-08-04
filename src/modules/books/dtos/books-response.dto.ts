import { TestamentEnum, type Testament } from '@/common/drizzle';
import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class BooksResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'Genesis' })
  name: string;

  @ApiProperty({ enum: TestamentEnum, example: TestamentEnum.OLD })
  testament: Testament;

  @ApiProperty({ type: Number, example: 1 })
  bookOrder: number;
}

export class BooksLiteResponseDto extends OmitType(BooksResponseDto, [
  'bookOrder',
] as const) {}

export class BaseBooksResponseDto extends withBaseResponse(BooksResponseDto) {}
export class BaseArrayBooksResponseDto extends withBaseArrayResponse(
  BooksResponseDto,
) {}
