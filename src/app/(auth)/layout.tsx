import * as React from "react";
import RequiresGuest from "@/components/requires/requiresGuest";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return <RequiresGuest>{children}</RequiresGuest>;
};

export default AuthLayout;
