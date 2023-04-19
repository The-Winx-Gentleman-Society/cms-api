import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SitesService, PrismaService],
  controllers: [SitesController],
})
export class SitesModule {}
