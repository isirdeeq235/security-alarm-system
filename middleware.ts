import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  ADMIN_LOGGEDIN_REDIRECT,
  USER_LOGGEDIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      const session = await auth();

      if (session?.user.role === "ADMIN")
        return Response.redirect(new URL(ADMIN_LOGGEDIN_REDIRECT, nextUrl));
      if (session?.user.role === "USER")
        return Response.redirect(new URL(USER_LOGGEDIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
