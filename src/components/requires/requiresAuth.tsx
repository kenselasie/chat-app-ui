"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { ROUTES } from "@/const/routes";

const RequiresAuth = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!authStore.isLoggedIn) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, [router]);

  if (!authStore.isLoggedIn) {
    <div>Loading....</div>;
  }
  return <div suppressHydrationWarning>{children}</div>;
};

export default RequiresAuth;
