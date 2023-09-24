import { Injectable } from '@nestjs/common';
import { Glimpse } from '../lib/glimpseType';
import { PrismaClient } from '@prisma/client';
import {
  glimpseCreationSchema,
  glimpseEditionSchema,
  glimpseCreationDto,
  glimpseEditionDto,
} from '../lib/glimpseSchema';
import { saveImage } from '../lib/imageHandling';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getAllGlimpses(orderBy: string): Promise<Glimpse[]> {
    return orderBy == 'popular'
      ? await prisma.glimpse.findMany({
          where: {
            isPublic: true,
          },
          orderBy: { accessCount: 'desc' },
        })
      : await prisma.glimpse.findMany({
          where: {
            isPublic: true,
          },
          orderBy: { createdAt: 'desc' },
        });
  }
  async getGlimpse(slug: string): Promise<Glimpse> {
    return await prisma.glimpse.findUniqueOrThrow({ where: { slug } });
  }
  async createNewGlimpse(
    glimpse: glimpseCreationDto,
  ): Promise<Glimpse | Error> {
    const { slug, content, lifetime, isPublic, secret, thumb } =
      glimpseCreationSchema.parse(glimpse);
    const g = await prisma.glimpse.findUnique({ where: { slug } });

    if (g) return Error();

    const filePath = await saveImage(thumb.filename, slug, thumb.data);
    return await prisma.glimpse.create({
      data: {
        slug,
        content,
        lifetime,
        isPublic,
        secret,
        thumb: filePath,
      },
    });
  }
  async editGlimpse(glimpse: glimpseEditionDto): Promise<void> {
    const { id, content, accessCount } = glimpseEditionSchema.parse(glimpse);
    if (content) {
      await prisma.glimpse.update({
        where: { id },
        data: {
          content,
        },
      });
    } else if (accessCount) {
      await prisma.glimpse.update({
        where: { id },
        data: { accessCount: accessCount + 1 },
      });
    }
  }
}
