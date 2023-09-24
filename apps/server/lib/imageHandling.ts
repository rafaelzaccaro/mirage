import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Saves the provided image data to a file and returns the relative path to it.
 * @param filename The name of the image to be saved.
 * @param data The image data.
 * @param glimpseSlug The slug of the Glimpse.
 * @returns The relative path to where the image was saved.
 */
export async function saveImage(
  filename: string,
  glimpseSlug: string,
  data: Promise<Buffer>,
): Promise<string> {
  const relativePath = join(
    'uploads',
    glimpseSlug,
    Date.now().toString() + filename,
  );
  if (!existsSync(join(__dirname, '../../uploads', glimpseSlug))) {
    mkdirSync(join(__dirname, '../../uploads', glimpseSlug), {
      recursive: true,
    });
  }
  const filePath = join(__dirname, '../../', relativePath);
  data.then((buffer: Buffer) => {
    writeFileSync(filePath, buffer);
  });
  return relativePath.replace(/\\/g, '/');
}
