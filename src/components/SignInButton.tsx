"use client";
import { useEffect } from "react";
import { createClientForBrowser } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function SignInButton() {
  const router = useRouter();
  const supabase = createClientForBrowser();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.role === "ADMIN") {
        router.replace("/dashboard"); // Redirect if already admin
      }
    };
    checkAuth();
  }, [router, supabase.auth]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className='bg-black text-white px-6 py-3 rounded-none w-full cursor-pointer'
    >
      Sign In with Google (Admin Only)
    </button>
  );
}
