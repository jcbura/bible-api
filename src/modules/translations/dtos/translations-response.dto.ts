import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class TranslationsResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'NIV' })
  name: string;
}

export class BaseTranslationsResponseDto extends withBaseResponse(
  TranslationsResponseDto,
) {}
export class BaseArrayTranslationsResponseDto extends withBaseArrayResponse(
  TranslationsResponseDto,
) {}
