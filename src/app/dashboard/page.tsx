"use client";
import { createClientForBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientForBrowser();
  const router = useRouter();

  // 1. Check auth state on load
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.role === "ADMIN") {
        router.push("/portal"); // Kick non-admins
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router, supabase.auth]);

  // 2. Sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/portal");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <pre className='mt-4 p-4 bg-gray-100 rounded'>
        {JSON.stringify(user, null, 2)} {/* Debug user object */}
      </pre>
      <button
        onClick={handleSignOut}
        className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
      >
        Sign Out
      </button>
    </div>
  );
}
