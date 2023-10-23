import { imageUpload } from './google-api/gdrive';

export async function getFileURL(data: Promise<Buffer>, filename: string) {
  try {
    const buffer: Buffer = await data;
    return await imageUpload(filename, buffer);
  } catch (error) {
    console.error('Error:', error);
  }
}
