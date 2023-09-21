import { Injectable } from '@nestjs/common';
import { Glimpse } from '../lib/glimpseType';
import { PrismaClient } from '@prisma/client';
import { glimpseCreationDto, glimpseEditionDto } from '../lib/glimpseSchema';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getAllGlimpses(): Promise<Glimpse[]> {
    return await prisma.glimpse.findMany();
  }
  async getGlimpse(id: string): Promise<Glimpse> {
    return await prisma.glimpse.findUniqueOrThrow({ where: { id } });
  }
  async createNewGlimpse(glimpse: glimpseCreationDto): Promise<Glimpse> {
    const { slug, content, lifetime, accessCount, isPublic, secret, thumb } =
      glimpse;
    return await prisma.glimpse.create({
      data: {
        slug,
        content,
        lifetime,
        accessCount,
        isPublic,
        secret,
        thumb,
      },
    });
  }
  async editGlimpse(glimpse: glimpseEditionDto): Promise<void> {
    const { id, content, lifetime, accessCount, isPublic, secret, thumb } =
      glimpse;
    await prisma.glimpse.update({
      where: { id },
      data: {
        content,
        lifetime,
        accessCount,
        isPublic,
        secret,
        thumb,
      },
    });
  }
}
