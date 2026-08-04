import { ChaptersController } from '@/modules/chapters/chapters.controller';
import { ChaptersService } from '@/modules/chapters/chapters.service';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ChaptersController],
  providers: [DrizzleService, ChaptersService],
})
export class ChaptersModule {}
