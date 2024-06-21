import { NextResponse, NextRequest } from 'next/server'


 
// This function can be marked `async` if using `await` inside

export function middleware(request) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login" || path === "/signup" 
  const isToken = request.cookies.get("token")?.value
  console.log(isToken)

  if (isPublicPath && isToken){
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
  }
  if(!isPublicPath && !isToken){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard"
  ],
}