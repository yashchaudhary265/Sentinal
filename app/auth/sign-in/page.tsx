'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInCard from "./_components/SignInCard";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      router.push("/overview/dashbored/bots");
    }
  }, [router]);

  return (
      <SignInCard />
  );
}