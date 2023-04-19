import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TemplatesService } from './templates.service';
import { TemplateDto } from './dto/templates.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private templateService: TemplatesService) {}

  @Roles('ADMIN', 'CLIENT')
  // @UseGuards(RolesGuard)
  @Get('/:site_name')
  getByEmail(@Param('site_name') site_name: string) {
    return this.templateService.getBySite(site_name);
  }

  @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/')
  create(@Body() body: TemplateDto) {
    return this.templateService.save(body);
  }
}
