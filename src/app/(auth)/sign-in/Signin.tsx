"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import onboardingImage from "@/assets/onboarding_img.svg";
import logo from "@/assets/logo.svg";
import googleIcon from "@/assets/google-icon.svg";
import { ROUTES } from "@/const/routes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sendOTPVerification } from "./actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInFormValidator = z.object({
  email: z.string().email().max(250),
});

type TSignInFormValidator = z.infer<typeof SignInFormValidator>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormValidator>({
    resolver: zodResolver(SignInFormValidator),
  });
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: (variables: { email: string }) =>
      sendOTPVerification({ email: variables.email }),
  });
  const onSubmit = async ({ email }: TSignInFormValidator) => {
    mutate(
      { email },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data.message);
          router.push(ROUTES.VERIFY(email));
        },
        onError: (err) => {
          const error = err as any;
          toast.error(
            error?.response?.data?.message ||
              error?.data?.message ||
              error?.message ||
              "Something bad happened"
          );
        },
        onSettled: () => {},
      }
    );
  };

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="hidden h-full lg:flex lg:items-center lg:justify-center">
        <Image
          src={onboardingImage}
          alt="OnboardingImage"
          width="537"
          height="429"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-5">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Image" width="32" height="32" />
              <p className="font-bold text-lg">chatteree</p>
            </div>
            <h1 className="text-3xl font-bold">
              Howdy chatter! Your peeps are waiting
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email address to start chatting
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs text-muted-foreground"
                >
                  Email address
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  className={cn({
                    "placeholder:text-slate-300": true,
                    "focus-visible:ring-red-400": errors?.email,
                  })}
                  required
                />
                <small className="text-red-400">{errors.email?.message}</small>
              </div>
              <div className="flex justify-between">
                <div />
                <Button type="submit" className="">
                  <p>Next</p>
                </Button>
              </div>
            </div>
          </form>
          <hr />
          <Button
            type="submit"
            variant={"outline"}
            className="flex items-center gap-3"
          >
            <Image src={googleIcon} alt="Image" width="24" height="24" />
            <span> Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
