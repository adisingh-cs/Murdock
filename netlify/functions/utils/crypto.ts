import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// Fallback key purely for local development purposes. Never used if ENCRYPTION_SECRET is present.
const DEFAULT_DEV_KEY = 'murdock_local_secret_key_1234567890'; 

/**
 * Returns a secure 32-byte key derived from the environment secret
 */
const getEncryptionKey = (): Buffer => {
  const secret = process.env.ENCRYPTION_SECRET || DEFAULT_DEV_KEY;
  // Use SHA-256 to ensure the output is exactly 32 bytes long regardless of input size
  return crypto.createHash('sha256').update(String(secret)).digest();
};

/**
 * Encrypts a plain text string securely using AES-256-GCM.
 * Output format: 'ivHex:authTagHex:encryptedTextHex'
 */
export const encryptKey = (plainText: string): string => {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16); // 16 bytes for GCM
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Format: iv:authTag:encryptedValue -> allows easy parsing and guarantees integrity
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
};

/**
 * Decrypts an AES-256-GCM encrypted payload securely.
 * Payload format must be: 'ivHex:authTagHex:encryptedTextHex'
 */
export const decryptKey = (encryptedPayload: string): string => {
  if (!encryptedPayload || typeof encryptedPayload !== 'string') {
    throw new Error('Invalid encrypted payload provided');
  }

  const parts = encryptedPayload.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted payload format (expected IV:Tag:Data)');
  }

  const [ivHex, authTagHex, encryptedDataHex] = parts;
  const key = getEncryptionKey();
  
  const decipher = crypto.createDecipheriv(
    ALGORITHM, 
    key, 
    Buffer.from(ivHex, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  
  let decrypted = decipher.update(encryptedDataHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
