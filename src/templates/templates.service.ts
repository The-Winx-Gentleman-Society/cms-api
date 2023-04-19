import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async getBySite(name: string) {
    return this.prisma.template.findFirst({
      where: {
        site: {
          name,
        },
      },
    });
  }

  async save({ site_name, schema, name }) {
    const site = await this.prisma.site.findFirst({
      where: {
        name: site_name,
      },
    });

    return this.prisma.template.create({
      data: {
        schema,
        name,
        site: {
          connect: {
            id: site.id,
          },
        },
      },
    });
  }
}
