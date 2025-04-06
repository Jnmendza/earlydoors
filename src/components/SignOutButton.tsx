// components/SignOutButton.tsx
"use client";
import { signOut } from "@/utils/actions";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.refresh(); // Ensure client-side cache is cleared
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out!</button>;
}
