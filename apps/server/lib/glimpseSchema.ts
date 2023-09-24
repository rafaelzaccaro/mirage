import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const glimpseCreationSchema = z.object({
  slug: z.string(),
  content: z.string(),
  lifetime: z.dateString(),
  secret: z.string().optional(),
  isPublic: z
    .string()
    .transform((t) => Boolean(t))
    .pipe(z.boolean()),
  thumb: z.any(),
});

export const glimpseEditionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  content: z.string(),
  lifetime: z.dateString(),
  secret: z.string().optional(),
  accessCount: z.number().positive().finite(),
  isPublic: z
    .string()
    .transform((t) => Boolean(t))
    .pipe(z.boolean()),
  thumb: z.any(),
});

export class glimpseCreationDto extends createZodDto(glimpseCreationSchema) {}
export class glimpseEditionDto extends createZodDto(glimpseEditionSchema) {}
