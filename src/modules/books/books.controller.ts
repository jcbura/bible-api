import { TestamentEnum, type Testament } from '@/common/drizzle';
import { BooksService } from '@/modules/books/books.service';
import {
  BaseArrayBooksResponseDto,
  BaseBooksResponseDto,
  BooksResponseDto,
} from '@/modules/books/dtos';
import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get books' })
  @ApiOkResponse({ type: BaseArrayBooksResponseDto })
  @ApiQuery({ name: 'testament', enum: TestamentEnum, required: false })
  @Get()
  async findMany(
    @Query('testament', new ParseEnumPipe(TestamentEnum, { optional: true }))
    testament?: Testament,
  ): Promise<BooksResponseDto[]> {
    return this.booksService.findMany(testament);
  }

  @ApiOperation({ summary: 'Get book' })
  @ApiOkResponse({ type: BaseBooksResponseDto })
  @Get(':bookId')
  async find(
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Promise<BooksResponseDto> {
    return this.booksService.find(bookId);
  }
}
