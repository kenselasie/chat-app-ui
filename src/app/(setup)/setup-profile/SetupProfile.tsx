"use client";
import * as React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/const/routes";
import Uploader from "@/components/uploader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "./actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { authStore } from "@/store/authStore";

const SetUpProfileFormValidator = z.object({
  name: z.string().max(250),
});

type TSetUpProfileFormValidator = z.infer<typeof SetUpProfileFormValidator>;

const SetupProfile = () => {
  const [file, setFiles] = React.useState<File[]>();
  const router = useRouter();
  const userDetails = authStore.userDetails;

  const onFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSetUpProfileFormValidator>({
    resolver: zodResolver(SetUpProfileFormValidator),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (variables: {
      name: string;
      id: string;
      profilePhoto?: FormData;
    }) => updateProfile(variables),
  });

  const onSubmit = async ({ name }: TSetUpProfileFormValidator) => {
    const formData = new FormData();

    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }
    mutate(
      {
        id: userDetails?.id!,
        name,
        profilePhoto: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Successful");
          router.push(ROUTES.CHAT_DASHBOARD({}));
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                Your name
              </Label>
              <Input
                {...register("name")}
                className={cn({
                  "placeholder:text-slate-300": true,
                  "focus-visible:ring-red-400": errors?.name,
                })}
                id="email"
                type="text"
                required
              />
            </div>
            <div className="flex justify-center mt-2">
              <Button type="submit" disabled={isPending} className="">
                Let's geauxxxx!{" "}
                {isPending && <LoaderIcon className="animate-spin" />}
              </Button>
            </div>
          </div>
        </form>
        <div className="w-[352px] h-[150px]" />
      </div>
    </div>
  );
};

export default SetupProfile;
