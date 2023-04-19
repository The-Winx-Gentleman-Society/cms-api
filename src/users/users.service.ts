import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findMany(data: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(data);
  }

  findUnique(data: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(data);
  }

  create(data: Prisma.UserCreateArgs) {
    return this.prisma.user.create(data);
  }
}
