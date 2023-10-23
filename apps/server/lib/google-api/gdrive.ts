import { google } from 'googleapis';
import { authorize, OAuth2Client } from './gdrive-auth';
//import { createReadStream } from 'fs';
import { Readable } from 'stream';

export async function imageUpload(
  fileName: string,
  file: Buffer,
): Promise<string | null | undefined> {
  const auth: OAuth2Client = await authorize();
  const readable = new Readable();
  readable._read = () => {};
  readable.push(file);
  readable.push(null);
  const media = {
    mimeType: 'image/jpeg',
    body: readable,
  };

  const drive = google.drive({ version: 'v3', auth });
  return new Promise<string | null | undefined>((resolve, reject) => {
    drive.files.create(
      {
        requestBody: {
          name: fileName,
        },
        media: media,
        fields: 'id, webViewLink, webContentLink',
      },
      async (err, file) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          await drive.permissions.create({
            fileId: file!.data.id!,
            requestBody: {
              type: 'anyone',
              role: 'reader',
            },
          });
          const fileurl = file!.data.webContentLink;
          resolve(fileurl);
        }
      },
    );
  });
}

export async function deleteImage(id: string) {
  const auth = await authorize();

  const drive = google.drive({ version: 'v3', auth });
  drive.files.delete({
    fileId: id,
  });
}
