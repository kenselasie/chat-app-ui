"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { ROUTES } from "@/const/routes";

export default function Home() {
  const router = useRouter();

  React.useLayoutEffect(() => {
    if (!authStore.isLoggedIn) {
      router.replace(ROUTES.SIGN_IN);
    } else {
      if (authStore.userDetails?.status === "COMPLETE") {
        router.replace(ROUTES.CHAT_DASHBOARD({}));
      } else {
        router.replace(ROUTES.SETUP_CHATID);
      }
    }
  }, [router]);

  return <></>;
}
