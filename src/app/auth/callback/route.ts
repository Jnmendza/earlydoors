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
