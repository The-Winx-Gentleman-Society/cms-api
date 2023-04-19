import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    if (roles.every((role) => role !== request['user']?.role))
      throw new UnauthorizedException();

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookies = request.headers.cookie?.split(';');
    const authCookie = cookies
      ?.find((cookie) => cookie.split('=')[0].toLowerCase() === 'authorization')
      ?.split('=')[1]
      ?.replace('%20', ' ');

    const [type, token] =
      request.headers.authorization?.split(' ') ?? authCookie?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
