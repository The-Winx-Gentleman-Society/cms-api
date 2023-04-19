import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findUnique({
      where: {
        email,
      },
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, id: user.id, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
