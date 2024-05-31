import { Prisma } from "@prisma/client";
import * as React from "react";
import Image from "next/image";
import { authStore } from "@/store/authStore";
import Link from "next/link";
import { ROUTES } from "@/const/routes";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";

export type ChatCellProps = Prisma.ChatGetPayload<{
  include: {
    users: {
      include: {
        photo: true;
      };
    };
    messages: {
      include: {
        sender: true;
      };
    };
  };
}>;

const ChatCell = ({
  chat,
  recipientId,
}: {
  chat: ChatCellProps;
  recipientId: string;
}) => {
  const getRecipient = () => {
    if (chat.users.length <= 0) return null;
    if (chat.users.length === 1) {
      return chat.users[0];
    }
    return chat.users.filter((el) => el.id !== authStore.userDetails?.id)[0];
  };
  const recipient = getRecipient();

  return (
    <Link
      href={ROUTES.CHAT_DASHBOARD({
        recipientId: recipient?.id,
        chatId: chat.id,
      })}
      className={cn({
        "flex w-full gap-3 cursor-pointer hover:bg-[#F7F7F7] p-4": true,
        "bg-[#F7F7F7]": recipientId === recipient?.id,
      })}
    >
      <div>
        {recipient?.photo ? (
          <Image
            src={`/uploads/${recipient.photo.original}`}
            width={48}
            height={48}
            alt="profile-img"
            className="rounded-full min-h-[48px] min-w-[48px] borer border-2"
          />
        ) : (
          <Avatar>
            <AvatarFallback className="bg-[#DDE7F2] text-[#094C97]">
              {(recipient?.name || "").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="flex justify-between">
          <p className="text-[15px] font-bold">{recipient?.name}</p>

          {chat.messages.length > 0 ? (
            <p className="text-xs">
              {format(
                chat.messages[chat.messages.length - 1].createdAt,
                "hh:mmaaa"
              )}
            </p>
          ) : (
            <p className="text-xs text-gray-400"></p>
          )}
        </div>
        <div>
          {chat.messages.length > 0 ? (
            <p className="text-xs">
              {chat.messages[chat.messages.length - 1].content}
            </p>
          ) : (
            <p className="text-xs">Keep all your personal info here</p>
          )}
          <p className="text-xs"></p>
        </div>
      </div>
    </Link>
  );
};

export default ChatCell;
