import crypto from 'crypto'

/**
 * Hashes the secret using the SHA512 algorithm.
 * @param secret - Secret string to be hashed.
 * @returns Object containing the hashed secret.
 */
export function hashSecret(secret: string): string {
  return crypto
    .createHmac('SHA512', String(process.env.CKEY!))
    .update(secret)
    .digest('hex')
}

/**
 * Verifies the provided secret string by hashing it and comparing it with the hash stored in the database.
 * @param secret Secret  string to verify against the hash stored in databse.
 * @param hash The hashed secret retrieved from database to be checked.
 * @returns `true` if the secret string matches the hashed version, `false` if it doesn't.
 */
export function verifySecret(secret: string, hash: string): boolean {
  return (
    crypto
      .createHmac('SHA512', String(process.env.CKEY!))
      .update(secret)
      .digest('hex') === hash
  )
}
