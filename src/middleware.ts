import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "konka_venus_secret_2026");

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin') && path !== '/admin/login' && path !== '/admin/setup') {
    const token = request.cookies.get('admin_jwt')?.value;
    
    if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));

    try {
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.role !== 'ADMIN') throw new Error("Not an admin");
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_jwt');
      return response;
    }
  }
  return NextResponse.next();
}

export const config = { matcher: '/admin/:path*' };