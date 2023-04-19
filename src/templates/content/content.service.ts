import { Injectable } from '@nestjs/common';
import { Validator } from 'jsonschema';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  getActiveContent(site: string, template: string) {
    return this.prisma.templateContent.findFirst({
      where: {
        template: {
          name: template,
          active: true,
          site: {
            name: site,
          },
        },
      },
    });
  }

  getContent(site: string, template: string) {
    return this.prisma.templateContent.findMany({
      where: {
        template: {
          name: template,
          site: {
            name: site,
          },
        },
      },
    });
  }

  async saveContent(
    site: string,
    template: string,
    name: string,
    content: string,
  ) {
    const templateData = await this.prisma.template.findFirst({
      where: {
        AND: {
          site: {
            name: site,
          },
          name: template,
        },
      },
    });

    const validator = new Validator();

    const { errors } = validator.validate(
      content,
      JSON.parse(templateData.schema),
    );

    if (errors.length > 0) return errors;

    return this.prisma.templateContent.create({
      data: {
        name,
        content,
        template: {
          connect: {
            id: templateData.id,
          },
        },
      },
    });
  }
}
