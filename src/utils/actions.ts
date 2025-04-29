"use server";
import { createClientForServer } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const signInWith = async (provider: Provider) => {
  const supabase = await createClientForServer();
  const auth_callback_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log("SIGN IN GOOGLE", userData, userError);

  if (error) {
    throw error;
  }
  redirect(data?.url);
};

const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWith("google").then(resolve).catch(reject);
  });
};

const signOut = async () => {
  const supabase = await createClientForServer();
  const { error } = await supabase.auth.signOut();

  // Clear any remaining cookies
  const cookieStore = await cookies();
  cookieStore.delete("sb-auth-token");
  cookieStore.delete("sb-refresh-token");

  if (error) {
    throw error;
  }
  redirect("/portal");
};

export { signInWithGoogle, signOut };
