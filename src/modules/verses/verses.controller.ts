import {
  BaseArrayVersesResponseDto,
  BaseVersesResponseDto,
  VersesResponseDto,
} from '@/modules/verses/dtos';
import { VersesService } from '@/modules/verses/verses.service';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books/:bookId/chapters/:chapterNumber/verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) {}

  @ApiOperation({ summary: 'Get verses' })
  @ApiOkResponse({ type: BaseArrayVersesResponseDto })
  @ApiQuery({ name: 'translation', type: String, required: true })
  @ApiQuery({ name: 'start', type: Number, required: false })
  @ApiQuery({ name: 'end', type: Number, required: false })
  @Get()
  async findMany(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Query('translation') translation: string,
    @Query('start', new ParseIntPipe({ optional: true })) start?: number,
    @Query('end', new ParseIntPipe({ optional: true })) end?: number,
  ): Promise<VersesResponseDto[]> {
    return this.versesService.findMany(
      bookId,
      chapterNumber,
      translation,
      start,
      end,
    );
  }

  @ApiOperation({ summary: 'Get verse' })
  @ApiOkResponse({ type: BaseVersesResponseDto })
  @ApiQuery({ name: 'translation', type: String, required: true })
  @Get(':verseNumber')
  async find(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('verseNumber', ParseIntPipe) verseNumber: number,
    @Query('translation') translation: string,
  ): Promise<VersesResponseDto> {
    return this.versesService.find(
      bookId,
      chapterNumber,
      verseNumber,
      translation,
    );
  }
}
