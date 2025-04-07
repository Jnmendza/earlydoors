// app/auth/callback/route.ts
import { createClientForServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const supabase = await createClientForServer();

  // 1. Exchange code for session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    await supabase.auth.refreshSession();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("Session data:", session); // Debug log
    if (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(
        new URL("/portal?error=auth_failed", request.url)
      );
    }
  }

  // 2. Redirect to dashboard (middleware will verify is_super_admin)
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

// import { NextResponse } from "next/server";
// // The client you created from the Server-Side Auth instructions
// import { createClientForServer } from "@/utils/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get("next") ?? "/";

//   if (code) {
//     const supabase = await createClientForServer();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);
//     if (!error) {
//       const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === "development";
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }
