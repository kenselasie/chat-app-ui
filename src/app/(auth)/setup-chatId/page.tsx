import * as React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ROUTES } from "@/const/routes";

const SetupChatId = () => {
  return (
    <div className="flex relative justify-center items-center w-[100vw] h-[100vh]">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-5">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Image" width="32" height="32" />
            <p className="font-bold text-lg">chatteree</p>
          </div>
          <h1 className="text-3xl font-bold">
            A Chatteree ID cos you're special.
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            People will be able to find you with your unique ID
          </p>
        </div>
        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Chatteree ID
            </Label>
            <Input id="email" type="text" placeholder="@" required />
          </div>
          <div className="flex justify-between mt-2">
            <div />
            <Button type="submit" className="">
              <Link href={ROUTES.VERIFY}>Continue</Link>
            </Button>
          </div>
        </div>
        <div className="w-[352px] h-[150px]" />
      </div>
    </div>
  );
};

export default SetupChatId;
