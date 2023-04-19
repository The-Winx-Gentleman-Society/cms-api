import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { SaveContentDto } from './dto/content.dto';

@ApiTags('Template content')
@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('/:site/:template')
  getContent(@Param('site') site: string, @Param('template') template: string) {
    return this.contentService.getContent(site, template);
  }

  @Get('/:site/:template/active')
  getActiveContent(
    @Param('site') site: string,
    @Param('template') template: string,
  ) {
    return this.contentService.getActiveContent(site, template);
  }

  @Post('/')
  saveContent(@Body() { site, template, name, content }: SaveContentDto) {
    return this.contentService.saveContent(site, template, name, content);
  }
}
