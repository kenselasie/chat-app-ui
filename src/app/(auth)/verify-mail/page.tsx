import * as React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import mailCheckIllustration from "@/assets/mail-chech-illus.svg";
import { ArrowLeft } from "lucide-react";

const Verify = () => {
  return (
    <div className="flex relative justify-center items-center w-[100vw] h-[100vh]">
      <div className="bg-red-100 self-start">
        <div className="absolute shadow-[0px_2px_16px_0px_#101C261F] lg:ml-96 md:ml-52 ml-10 mt-[155px] justify-self-end rounded-full p-3">
          <ArrowLeft size={15} className="cursor-pointer" />
        </div>
      </div>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-5">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Image" width="32" height="32" />
            <p className="font-bold text-lg">chatteree</p>
          </div>
          <h1 className="text-3xl font-bold">Check your mail</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter the confirmation code sent to{" "}
            <span className="font-bold">kwesiokyere@gmail.com</span> to verify
            that it is you.
          </p>
        </div>
        <div>
          <InputOTP maxLength={6}>
            <InputOTPGroup className="gap-2">
              <InputOTPSlot
                className="bg-[#F7F7F7] w-[56px] h-[64px]"
                index={0}
              />
              <InputOTPSlot
                className="bg-[#F7F7F7] w-[56px] h-[64px]"
                index={1}
              />
              <InputOTPSlot
                className="bg-[#F7F7F7] w-[56px] h-[64px]"
                index={2}
              />
              <InputOTPSlot
                className="bg-[#F7F7F7] w-[56px] h-[64px]"
                index={3}
              />
              <InputOTPSlot
                className="bg-[#F7F7F7] w-[56px] h-[64px]"
                index={4}
              />
              <InputOTPSlot
                className="bg-[#F7F7F7] w-[56px] h-[64px]"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-sm">Resend code</p>
          <Button>
            <p className="text-xs">Verify</p>
          </Button>
        </div>
        <div>
          <Image
            src={mailCheckIllustration}
            alt="mailCheckIllustration"
            width="382"
            height="259"
          />
        </div>
      </div>
    </div>
  );
};

export default Verify;
