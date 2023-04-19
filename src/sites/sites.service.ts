import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.site.findMany({});
  }

  getByName(name: string) {
    return this.prisma.site.findFirst({
      where: {
        name,
      },
    });
  }

  create(name: string) {
    return this.prisma.site.create({
      data: {
        name,
      },
    });
  }

  async addUser(name: string, email: string) {
    const site = await this.prisma.site.findFirst({
      where: {
        name,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return this.prisma.siteUser.create({
      data: {
        site_id: site.id,
        user_id: user.id,
      },
    });
  }
}
