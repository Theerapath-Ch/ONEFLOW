import { auth } from "@/auth";

// Protect app routes that require login — เพิ่ม path ได้เรื่อยๆ
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  // ถ้าเข้า /dashboard แบบไม่ล็อกอิน → ส่งไป /login
  const protectedPrefixes = ["/dashboard"];
  const isProtected = protectedPrefixes.some((p) => req.nextUrl.pathname.startsWith(p));

  if (isProtected && !isLoggedIn) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(url);
  }

  // ถ้าล็อกอินแล้วเข้า /login หรือ /register → ส่งกลับหน้าแรก
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
