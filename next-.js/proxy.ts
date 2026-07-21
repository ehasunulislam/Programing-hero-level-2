import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getNewAccessToken } from './service/refreshToken';

const Auth_Routes = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news"];

 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) { 
    const pathName = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;


    if(!decodedAccessToken?.success && decodedRefreshToken?.success) {
        // acccss token is expired but refresh token is valid, get new access token from backend
        const result = await getNewAccessToken();

        if(result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            
            decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
        }

    }


    let userRole = null;

    if(!decodedAccessToken?.success) {
        cookieStore.delete("accessToken");
    }

    if(decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role
    }

    // user is logged in and trying to access login or register page, redirect to dashborad or root home page
    if(accessToken && Auth_Routes.includes(pathName)) {
        if(userRole === "USER") {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else if(userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }   else if(userRole === "AUTHOR") {
            return NextResponse.redirect(new URL('/author-dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }


    // checking the public routes
    const isPublicRoute = PUBLIC_ROUTES.some((route) => {
        return pathName === route || pathName.startsWith(route + "/")
    });

    const isAuthRoute = Auth_Routes.some((route) => {
        return pathName === route || pathName.startsWith(route + "/")
    });


    // Authenticaiton pages protection : Authorizaiton is not handle yet
    if(!accessToken && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url))
    }


    // Authorization  // -> home ar bodole amra not-found page a pathate pari 
    if(pathName.startsWith("/dashboard") && userRole !== "USER") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }else if(pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    } else if(pathName.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    
    // return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*'
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}