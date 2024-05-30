import * as React from "react";
import ConversationScreen from "@/components/conversation";
import ConvoHeader from "@/components/convo-header";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getChatById } from "@/app/(dashboard)/chat/actions";
import { authStore } from "@/store/authStore";
import { ChatCellProps } from "@/components/chat-cell";
import { z } from "zod";
import InputBox from "./InputBox";

const ChatFormSchema = z.object({
  message: z.string({
    message: "No message",
  }),
});
type TChatFormSchema = z.infer<typeof ChatFormSchema>;

const ConvoScreen = () => {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId") || "";
  const recipientId = searchParams.get("recipientId") || "";
  const {
    data: userChat,
    isLoading: isLoadingChat,
    error: chatError,
  } = useQuery({
    queryKey: ["getChatById", chatId],
    queryFn: () =>
      getChatById({
        id: chatId,
      }),
  });

  const getRecipient = (chat: ChatCellProps) => {
    if (chat.users.length <= 0) return null;
    if (chat.users.length === 1) {
      return chat.users[0];
    }
    return chat.users.filter((el) => el.id !== authStore.userDetails?.id)[0];
  };

  if (isLoadingChat) {
    return (
      <div className="flex flex-col gap-3 items-centerS h-full overflow-y-scroll mt-5">
        <p className="font-bold">Loading chats...</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen min-h-[50vh] flex-col lg:col-span-2 p-4">
      <div className="flex-1 h-[95%]">
        <div className="h-[7%]">
          {userChat?.data && (
            <ConvoHeader name={getRecipient(userChat.data)?.name || ""} />
          )}
          <hr />
        </div>
        <div className="h-[93%]">
          <ConversationScreen
            messages={userChat?.data?.messages!}
            userId={authStore.userDetails?.id || ""}
          />
        </div>
      </div>
      <InputBox chatId={chatId} />
    </div>
  );
};

export default ConvoScreen;
