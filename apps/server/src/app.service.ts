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
      ? await prisma.glimpse.findMany({ orderBy: { accessCount: 'desc' } })
      : await prisma.glimpse.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async getGlimpse(id: string): Promise<Glimpse> {
    return await prisma.glimpse.findUniqueOrThrow({ where: { id } });
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
    const {
      id,
      slug,
      content,
      lifetime,
      accessCount,
      isPublic,
      secret,
      thumb,
    } = glimpseEditionSchema.parse(glimpse);
    const filePath = await saveImage(thumb.filename, slug, thumb.data);
    await prisma.glimpse.update({
      where: { id },
      data: {
        content,
        lifetime,
        accessCount,
        isPublic,
        secret,
        thumb: filePath,
      },
    });
  }
}
