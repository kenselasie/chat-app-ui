"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { ROUTES } from "@/const/routes";

const RequiresGuest = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  React.useEffect(() => {
    if (authStore.isLoggedIn) {
      if (authStore.userDetails?.status === "MUST_UPDATE_USERNAME") {
        router.replace(ROUTES.SETUP_CHATID);
      } else if (authStore.userDetails?.status === "MUST_UPDATE_NAME") {
        router.replace(ROUTES.SETUP_PROFILE);
      } else {
        router.replace(ROUTES.CHAT_DASHBOARD);
      }
    }
  }, [router]);

  if (!authStore.isLoggedIn) {
    <div>Loading....</div>;
  }
  return <>{children}</>;
};

export default RequiresGuest;
