/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
export default async function middleware(req: any) {
  const isValid = withAuth(req);

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isValid || isValid === null) throw new Error("UNAUTHORIZED ACCESS !");

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);

    return NextResponse.redirect(new URL("/error", req.url));
  }
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
