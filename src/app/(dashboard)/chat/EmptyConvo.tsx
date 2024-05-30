import * as React from "react";
import emptyConvo from "@/assets/empty-convo.svg";
import Image from "next/image";
import { FilePen, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { startAChatWithSelf } from "./actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EmptyConvoProps = { id: string; name: string };

const EmptyConvo = ({ id, name }: EmptyConvoProps) => {
  const queryClient = useQueryClient();

  const { mutate: startChatWithSelfService, isPending: isPendingStartChat } =
    useMutation({
      mutationKey: ["startChatWithSelf"],
      mutationFn: (variables: { id: string }) =>
        startAChatWithSelf({ id: variables.id }),
    });

  const startChatting = () => {
    startChatWithSelfService(
      { id },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (err) => {
          toast.error(err.message);
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ["getUserByID"],
          });
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-32 lg:col-span-2 p-16 h-screen w-full">
      <div className="flex flex-col">
        <p className="text-base">Welcome</p>
        <p className="text-3xl font-bold">{name}!</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-10 w-full">
        <Image src={emptyConvo} width={300} height={300} alt="empty-png" />
        <p>We hear say your mouth die hmmm</p>

        <Button
          className="space-x-3"
          onClick={startChatting}
          disabled={isPendingStartChat}
        >
          <FilePen color="white" size={20} />{" "}
          <p className="text-xs">Start chatting</p>
          {isPendingStartChat && <LoaderIcon className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default EmptyConvo;
