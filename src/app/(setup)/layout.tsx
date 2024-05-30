import * as React from "react";
import RequiresAuth from "@/components/requires/requiresAuth";

const SetupLayout = ({ children }: React.PropsWithChildren) => {
  return <RequiresAuth>{children}</RequiresAuth>;
};

export default SetupLayout;
