import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const glimpseCreationSchema = z.object({
  slug: z.string(),
  content: z.string(),
  lifetime: z.dateString(),
  secret: z.string().optional(),
  isPublic: z
    .string()
    .transform((b) => (b == 'true' ? true : false))
    .pipe(z.boolean()),
  thumb: z.any().optional(),
});

export const glimpseEditionSchema = z.object({
  id: z.string(),
  content: z.string().optional(),
  accessCount: z.coerce.number().optional(),
});

export class glimpseCreationDto extends createZodDto(glimpseCreationSchema) {}
export class glimpseEditionDto extends createZodDto(glimpseEditionSchema) {}
