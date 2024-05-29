"use client";
import * as React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ROUTES } from "@/const/routes";
import Uploader from "@/components/uploader";

const SetupProfile = () => {
  const onFileUpload = (files: File[]) => {
    console.log(files);
  };
  return (
    <div className="flex relative justify-center items-center w-[100vw] h-[100vh]">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-5 place-items-center">
          <div className="flex justify-center items-center gap-2">
            <Image src={logo} alt="Image" width="32" height="32" />
            <p className="font-bold text-lg">chatteree</p>
          </div>
          <h1 className="text-3xl font-bold">Help them identify you </h1>
        </div>
        <div>
          <Uploader
            text={"Upload photo"}
            multiple={false}
            name={"uploadPhoto"}
            onChange={({ files }: { files: File[] }) => onFileUpload(files)}
          />
        </div>
        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Your name
            </Label>
            <Input id="email" type="text" required />
          </div>
          <div className="flex justify-center mt-2">
            <Button type="submit" className="">
              <Link href={ROUTES.VERIFY}>Let’s geauxxxx!</Link>
            </Button>
          </div>
        </div>
        <div className="w-[352px] h-[150px]" />
      </div>
    </div>
  );
};

export default SetupProfile;
