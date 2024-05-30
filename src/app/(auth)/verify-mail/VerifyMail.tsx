"use client";
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
import { ArrowLeft, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/const/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { sendOTPVerification } from "../sign-in/actions";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { verifyOTPCode } from "./actions";
import { authStore } from "@/store/authStore";

const OTPFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
type TOTPFormSchema = z.infer<typeof OTPFormSchema>;

const VerifyMail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TOTPFormSchema>({
    resolver: zodResolver(OTPFormSchema),
  });

  const { mutate: resendOTPCodeService, isPending: isResendingOTP } =
    useMutation({
      mutationKey: ["sendOTP"],
      mutationFn: (variables: { email: string }) =>
        sendOTPVerification({ email: variables.email }),
    });

  const { mutate: verifyOTPCodeService, isPending: isVerifyingOTP } =
    useMutation({
      mutationKey: ["verifyOTP"],
      mutationFn: (variables: { email: string; otpCode: string }) =>
        verifyOTPCode({ email: variables.email, otpCode: variables.otpCode }),
    });

  const resendOTPCode = () => {
    resendOTPCodeService(
      { email },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (err) => {
          toast.error(err?.message);
          console.log(err);
        },
      }
    );
  };

  const onSubmit = async ({ pin }: TOTPFormSchema) => {
    verifyOTPCodeService(
      { email, otpCode: pin },
      {
        onSuccess: (data) => {
          console.log(data);
          authStore.setIsLoggedIn(true);
          authStore.setAccessToken(data.accessToken);
          authStore.setUserDetails(data.userDetails);
          if (data.userDetails.status === "MUST_UPDATE_USERNAME") {
            return router.push(ROUTES.SETUP_CHATID);
          } else {
            return router.push(ROUTES.CHAT_DASHBOARD);
          }
        },
        onError: (err) => {
          const error = err as any;
          toast.error(error?.message || "Something bad happened");
        },
        // onSettled: () => {
        //   router.push(ROUTES.VERIFY(email));
        // },
      }
    );
  };
  return (
    <div className="flex relative justify-center items-center w-[100vw] h-[100vh]">
      <div className="bg-red-100 self-start">
        <Link className="size-full" href={ROUTES.SIGN_IN}>
          <div className="absolute shadow-[0px_2px_16px_0px_#101C261F] lg:ml-96 md:ml-52 ml-10 mt-[155px] justify-self-end rounded-full p-3">
            <ArrowLeft size={15} className="cursor-pointer" />
          </div>
        </Link>
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
            <span className="font-bold">{email}</span> to verify that it is you.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              control={control}
              name="pin"
              render={({ field }) => (
                <InputOTP maxLength={6} {...field}>
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
              )}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <Button
              variant={"ghost"}
              onClick={resendOTPCode}
              className="m-0 p-0 h-0"
              disabled={isResendingOTP}
            >
              <p className="font-semibold text-sm cursor-pointer">
                Resend code{" "}
                {isResendingOTP && <LoaderIcon className="animate-spin" />}
              </p>
            </Button>
            <Button type="submit" disabled={isVerifyingOTP}>
              Verify {isVerifyingOTP && <LoaderIcon className="animate-spin" />}{" "}
            </Button>
          </div>
        </form>
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

export default VerifyMail;
