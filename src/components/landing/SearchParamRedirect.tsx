"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SearchParamRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("code")) {
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}
