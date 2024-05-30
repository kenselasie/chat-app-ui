import { Prisma } from "@prisma/client";
import * as React from "react";
import Image from "next/image";
import { authStore } from "@/store/authStore";

type ChatCellProps = Prisma.ChatGetPayload<{
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
  const recipientName = () => {
    if (chat.users.length <= 0) return "No Name";
    if (chat.users.length === 1) {
      return chat.users[0].name;
    }
    if (chat.users.length === 2) {
      return chat.users.filter((el) => el.id === authStore.userDetails?.id)[0]
        .name;
    }
    return chat.chatName;
  };
  return (
    <div className="flex w-full gap-3 cursor-pointer hover:bg-[#F7F7F7] p-4">
      <div>
        {chat.users[0].photo ? (
          <Image
            src={chat.users[0].photo.thumbnail}
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
          <p className="text-[15px] font-bold">{recipientName()}</p>
          <p className="text-xs text-gray-400">8:46am</p>
        </div>
        <div>
          <p className="text-sm">I actually tell am. That be what I tell...</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCell;
