import { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  return url.pathname == "/"
    ? redirectRootToTrafficImagesPage(url)
    : NextResponse.next();
}

function redirectRootToTrafficImagesPage(url: NextURL) {
  url.pathname = "/traffic-images";
  return NextResponse.redirect(url);
}
