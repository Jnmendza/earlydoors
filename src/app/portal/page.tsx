"use client";
import { createClientForBrowser } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PortalPage() {
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
    <div className='min-h-screen grid place-items-center'>
      <button
        onClick={handleGoogleLogin}
        className='bg-black text-white px-6 py-3 rounded-lg'
      >
        Sign In with Google (Admin Only)
      </button>
    </div>
  );
}
