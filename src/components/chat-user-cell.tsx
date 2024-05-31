"use client";
import { Prisma } from "@prisma/client";
import * as React from "react";
import Image from "next/image";
import { authStore } from "@/store/authStore";
import { ROUTES } from "@/const/routes";
import { useRouter } from "next/navigation";
import { startChatsWithAnotherUser } from "@/app/(dashboard)/chat/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ChatUserCellProps = Prisma.UserGetPayload<{
  include: {
    photo: true;
  };
}>;

const ChatUserCell = ({ user }: { user: ChatUserCellProps }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: startChatService, isPending: isPendingStartChat } =
    useMutation({
      mutationKey: ["startChatsWithAnotherUser"],
      mutationFn: (variables: { senderId: string; recipientId: string }) =>
        startChatsWithAnotherUser({
          senderId: variables.senderId,
          recipientId: variables.recipientId,
        }),
    });

  const startChatWithNewUser = () => {
    startChatService(
      { senderId: authStore?.userDetails?.id || "", recipientId: user.id },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          const recpt = data.data.users.filter(
            (usr) => usr.id === authStore?.userDetails?.id
          )[0];
          console.log(recpt);
          router.push(
            ROUTES.CHAT_DASHBOARD({
              recipientId: recpt.id,
              chatId: data.data.id,
            })
          );
        },
        onError: (err) => {
          toast.error(err.message);
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ["getMyChats"],
          });
        },
      }
    );
  };
  return (
    <div
      className="flex w-full gap-3 cursor-pointer hover:bg-[#F7F7F7] p-4"
      onClick={startChatWithNewUser}
    >
      <div>
        {user.photo ? (
          <Image
            src={user.photo.thumbnail}
            width={48}
            height={48}
            alt="profile-img"
          />
        ) : (
          <div className="rounded-full size-[48px] bg-gray-200" />
        )}
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="flex justify-between">
          <p className="text-[15px] font-bold">{user.name}</p>
          <p className="text-xs text-gray-400"></p>
        </div>
        <div>
          <p className="text-xs">Start a new chat</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCell;