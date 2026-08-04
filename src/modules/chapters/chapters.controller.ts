import { ChaptersService } from '@/modules/chapters/chapters.service';
import {
  BaseArrayChaptersResponseDto,
  BaseChaptersResponseDto,
  ChaptersResponseDto,
} from '@/modules/chapters/dtos';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books/:bookId/chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @ApiOperation({ summary: 'Get chapters' })
  @ApiOkResponse({ type: BaseArrayChaptersResponseDto })
  @Get()
  async findMany(
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Promise<ChaptersResponseDto[]> {
    return this.chaptersService.findMany(bookId);
  }

  @ApiOperation({ summary: 'Get chapter' })
  @ApiOkResponse({ type: BaseChaptersResponseDto })
  @Get(':chapterNumber')
  async find(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
  ): Promise<ChaptersResponseDto> {
    return this.chaptersService.find(bookId, chapterNumber);
  }
}
