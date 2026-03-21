import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionMaxAgeSeconds,
  hasValidAdminSession,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: getAdminSessionMaxAgeSeconds(),
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { authenticated: hasValidAdminSession(req) },
    { status: 200 }
  );
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
