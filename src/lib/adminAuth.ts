import crypto from 'crypto';
import type { AstroCookieSetOptions } from 'astro';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'flyaustria_super_secret_admin_key_2026';
const COOKIE_NAME = 'flyaustria_admin_session';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + '_flyaustria_salt_2026').digest('hex');
}

export function generateSessionToken(email: string): string {
  const timestamp = Date.now();
  const raw = `${email}:${timestamp}:${SESSION_SECRET}`;
  const signature = crypto.createHash('sha256').update(raw).digest('hex');
  const sessionObj = { email, timestamp, signature };
  return Buffer.from(JSON.stringify(sessionObj)).toString('base64');
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const decodedStr = Buffer.from(token, 'base64').toString('utf-8');
    const { email, timestamp, signature } = JSON.parse(decodedStr);

    if (!email || !timestamp || !signature) return false;

    // Check expiration (7 days max)
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > sevenDaysMs) return false;

    // Verify signature
    const raw = `${email}:${timestamp}:${SESSION_SECRET}`;
    const expectedSignature = crypto.createHash('sha256').update(raw).digest('hex');

    return signature === expectedSignature;
  } catch (err) {
    return false;
  }
}

export const cookieOptions: AstroCookieSetOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export { COOKIE_NAME };
