import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  get() {
    return this.usersService.findMany({});
  }

  @Get('/:email')
  getByEmail(@Param('email') email: string) {
    return this.usersService.findUnique({
      where: {
        email,
      },
    });
  }

  @Post('/')
  saveUser(@Body() body: UserDto) {
    const { email, password, role } = body;

    return this.usersService.create({
      data: { email, password, role },
    });
  }
}
