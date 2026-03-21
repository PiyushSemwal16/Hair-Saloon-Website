import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_SESSION_COOKIE_NAME = 'mg_admin_session';
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function base64UrlEncode(value: string): string {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4;
  const padded = pad ? normalized + '='.repeat(4 - pad) : normalized;
  return Buffer.from(padded, 'base64').toString('utf8');
}

function getSessionSecret(): string {
  // Fallback to ADMIN_PASSWORD only for local/dev to avoid hard failures.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-admin-session-secret';
}

function signPayload(payloadBase64: string): string {
  return createHmac('sha256', getSessionSecret())
    .update(payloadBase64)
    .digest('base64url');
}

export function createAdminSessionToken(): string {
  const payload = {
    role: 'admin',
    exp: Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  };

  const payloadBase64 = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function hasValidAdminSession(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!token || !token.includes('.')) return false;

  const [payloadBase64, receivedSignature] = token.split('.');
  if (!payloadBase64 || !receivedSignature) return false;

  const expectedSignature = signPayload(payloadBase64);
  const a = Buffer.from(receivedSignature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return false;
  }

  try {
    const payloadText = base64UrlDecode(payloadBase64);
    const payload = JSON.parse(payloadText) as { role?: string; exp?: number };
    if (payload.role !== 'admin' || !payload.exp) return false;
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function getAdminSessionMaxAgeSeconds(): number {
  return ADMIN_SESSION_MAX_AGE_SECONDS;
}

export function verifyAdminPassword(req: NextRequest): boolean {
  const password = req.headers.get('x-admin-password');
  if (password && password === process.env.ADMIN_PASSWORD) {
    return true;
  }

  return hasValidAdminSession(req);
}

export function createUnauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized - Invalid admin password' },
    { status: 401 }
  );
}
