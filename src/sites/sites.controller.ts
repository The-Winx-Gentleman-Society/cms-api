import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SitesService } from './sites.service';
import { ApiTags } from '@nestjs/swagger';
import { SiteDto, SiteUserDto } from './dto/sites.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Sites')
@Controller('sites')
export class SitesController {
  constructor(private sitesService: SitesService) {}

  @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.sitesService.getByName(name);
  }

  @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get('/')
  getAll() {
    return this.sitesService.getAll();
  }

  @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/')
  create(@Body() { name }: SiteDto) {
    return this.sitesService.create(name);
  }

  @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/user')
  addUser(@Body() { name, email }: SiteUserDto) {
    return this.sitesService.addUser(name, email);
  }
}
