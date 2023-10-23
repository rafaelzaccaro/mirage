import { join } from 'path';
import { cwd } from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { readFile, /*readFileSync,*/ writeFileSync } from 'fs';

export type OAuth2Client = typeof google.prototype.auth.OAuth2.prototype;

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive',
];
const TOKEN_PATH = join(cwd(), 'lib/google-api/token.json');
const CREDENTIALS_PATH = join(cwd(), 'lib/google-api/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    //const content = readFileSync(TOKEN_PATH, 'utf-8');
    const credentials = JSON.parse(process.env.GOOGLEAUTH_TOKEN!);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
  readFile(CREDENTIALS_PATH, 'utf8', (err, content) => {
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    writeFileSync(TOKEN_PATH, payload);
  });
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize(): Promise<OAuth2Client | null> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}
