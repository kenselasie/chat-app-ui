"use client";
import * as React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ROUTES } from "@/const/routes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateChatId } from "./actions";
import { authStore } from "@/store/authStore";
import { LoaderIcon } from "lucide-react";

const SetupChatIdFormSchema = z.object({
  username: z.string().max(250),
});

type TSetupChatIdFormSchema = z.infer<typeof SetupChatIdFormSchema>;

const SetupChatId = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSetupChatIdFormSchema>({
    resolver: zodResolver(SetupChatIdFormSchema),
  });
  const router = useRouter();
  const userDetails = authStore.userDetails;

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateChatId"],
    mutationFn: (variables: { username: string; id: string }) =>
      updateChatId({ username: variables.username, id: variables.id }),
  });

  const onSubmit = async ({ username }: TSetupChatIdFormSchema) => {
    console.log(userDetails?.id);
    mutate(
      { username, id: userDetails?.id! },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Successfully setup chat id");
          router.push(ROUTES.SETUP_PROFILE);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="text-xs text-muted-foreground"
              >
                Chatteree ID
              </Label>
              <Input
                {...register("username")}
                className={cn({
                  "placeholder:text-slate-300": true,
                  "focus-visible:ring-red-400": errors?.username,
                })}
                id="username"
                type="text"
                placeholder="@"
                required
              />
              <small className="text-red-400">{errors.username?.message}</small>
            </div>
            <div className="flex justify-between mt-2">
              <div />
              <Button type="submit" disabled={isPending} className="">
                Continue {isPending && <LoaderIcon className="animate-spin" />}
              </Button>
            </div>
          </div>
        </form>
        <div className="w-[352px] h-[150px]" />
      </div>
    </div>
  );
};

export default SetupChatId;
