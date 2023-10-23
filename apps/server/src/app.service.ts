import { Injectable } from '@nestjs/common';
import { Glimpse } from '../lib/glimpseType';
import { PrismaClient } from '@prisma/client';
import {
  glimpseCreationSchema,
  glimpseEditionSchema,
  glimpseCreationDto,
  glimpseEditionDto,
} from '../lib/glimpseSchema';
import { getFileURL } from '../lib/imageHandling';
import { deleteImage } from '../lib/google-api/gdrive';

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
    const { slug, content, lifetime, isPublic, secret, thumb } =
      glimpseCreationSchema.parse(glimpse);
    const g = await prisma.glimpse.findUnique({ where: { slug } });

    if (g) return Error();

    return await prisma.glimpse.create({
      data: {
        slug,
        content,
        lifetime,
        isPublic,
        secret,
        thumb: thumb
          ? await getFileURL(thumb.data, slug + thumb.filename)
          : null,
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

    expiredGlimpses.forEach(async (glimpse: Glimpse) => {
      if (glimpse.thumb)
        await deleteImage(glimpse.thumb.replace(/(?<=id=)(.*?)(?=&)/, '$1'));
    });

    await prisma.glimpse.deleteMany({
      where: {
        lifetime: { lte: new Date() },
      },
    });
  }
}
