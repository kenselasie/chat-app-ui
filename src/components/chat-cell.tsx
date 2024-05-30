import { Prisma } from "@prisma/client";
import * as React from "react";
import Image from "next/image";
import { authStore } from "@/store/authStore";
import Link from "next/link";
import { ROUTES } from "@/const/routes";

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

const ChatCell = ({ chat }: { chat: ChatCellProps }) => {
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
      className="flex w-full gap-3 cursor-pointer hover:bg-[#F7F7F7] p-4"
    >
      <div>
        {recipient?.photo ? (
          <Image
            src={recipient?.photo.thumbnail}
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
          <p className="text-[15px] font-bold">{recipient?.name}</p>
          <p className="text-xs text-gray-400">8:46am</p>
        </div>
        <div>
          <p className="text-sm">I actually tell am. That be what I tell...</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatCell;
