import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const glimpseCreationSchema = z.object({
  slug: z.string(),
  content: z.string(),
  lifetime: z.dateString(),
  secret: z.string().optional(),
  accessCount: z.number().positive().finite(),
  isPublic: z.boolean(),
  thumb: z.string().optional(),
});

const glimpseEditionSchema = z.object({
  id: z.string(),
  content: z.string(),
  lifetime: z.dateString(),
  secret: z.string().optional(),
  accessCount: z.number().positive().finite(),
  isPublic: z.boolean(),
  thumb: z.string().optional(),
});

export class glimpseCreationDto extends createZodDto(glimpseCreationSchema) {}
export class glimpseEditionDto extends createZodDto(glimpseEditionSchema) {}
