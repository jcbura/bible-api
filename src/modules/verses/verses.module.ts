import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { VersesController } from '@/modules/verses/verses.controller';
import { VersesService } from '@/modules/verses/verses.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [VersesController],
  providers: [DrizzleService, VersesService],
})
export class VersesModule {}
