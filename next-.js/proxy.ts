import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    console.log(pathName)
  return NextResponse.redirect(new URL('/', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin-dashboard/:path*'
  ],
}