import { Injectable } from '@nestjs/common';
import { Glimpse } from '../lib/glimpseType';
import { PrismaClient } from '@prisma/client';
import {
  glimpseCreationSchema,
  glimpseEditionSchema,
  glimpseCreationDto,
  glimpseEditionDto,
} from '../lib/glimpseSchema';
import { deleteImage, saveImage } from '../lib/imageHandling';

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
  async getGlimpse(slug: string): Promise<Glimpse | Error> {
    try {
      return await prisma.glimpse.findUniqueOrThrow({ where: { slug } });
    } catch (err) {
      return err;
    }
  }
  async createNewGlimpse(
    glimpse: glimpseCreationDto,
  ): Promise<Glimpse | Error> {
    let filePath: string | undefined;
    const { slug, content, lifetime, isPublic, secret, thumb } =
      glimpseCreationSchema.parse(glimpse);
    const g = await prisma.glimpse.findUnique({ where: { slug } });

    if (g) return Error();

    if (thumb) filePath = await saveImage(thumb.filename, slug, thumb.data);
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
  async editGlimpse(glimpse: glimpseEditionDto): Promise<void | Error> {
    try {
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
    } catch (err) {
      return err;
    }
  }

  async deleteExpiredGlimpses() {
    const expiredGlimpses = await prisma.glimpse.findMany({
      where: { lifetime: { lte: new Date() } },
    });

    expiredGlimpses.forEach(async (glimpse) => {
      if (glimpse.thumb) await deleteImage(glimpse.thumb);
    });

    await prisma.glimpse.deleteMany({
      where: {
        lifetime: { lte: new Date() },
      },
    });
  }
}
