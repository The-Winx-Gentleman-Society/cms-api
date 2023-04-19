import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { PrismaService } from 'src/prisma.service';
import { ContentModule } from './content/content.module';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService],
  imports: [ContentModule],
})
export class TemplatesModule {}
