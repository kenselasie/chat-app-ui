"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { ROUTES } from "@/const/routes";
import { socket } from "@/socket";

const RequiresAuth = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  React.useEffect(() => {
    socket.on("connected", () => {
      console.log("socket connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);

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
