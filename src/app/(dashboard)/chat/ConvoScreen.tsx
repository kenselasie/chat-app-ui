"use client";
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
import { socket } from "@/socket";
import { useQueryClient } from "@tanstack/react-query";

const ChatFormSchema = z.object({
  message: z.string({
    message: "No message",
  }),
});
type TChatFormSchema = z.infer<typeof ChatFormSchema>;

const ConvoScreen = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId") || "";
  const recipientId = searchParams.get("recipientId") || "";
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [istyping, setIsTyping] = React.useState(false);

  const {
    data: userChat,
    isLoading: isLoadingChat,
    error: chatError,
  } = useQuery({
    queryKey: ["getChatById", chatId],
    queryFn: () => {
      const data = getChatById({
        id: chatId,
      });
      socket.emit("join chat", chatId);
      return data;
    },
  });

  const getRecipient = (chat: ChatCellProps) => {
    if (chat.users.length <= 0) return null;
    if (chat.users.length === 1) {
      return chat.users[0];
    }
    return chat.users.filter((el) => el.id !== authStore.userDetails?.id)[0];
  };

  const typingHandler = (e: any) => {
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 2000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  };

  React.useEffect(() => {
    console.log(recipientId, chatId);
    socket.emit("setup", authStore.userDetails);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on(
      "message recieved",
      (newMessageRecieved: { recepient_id: string; data: any }) => {
        queryClient.invalidateQueries({
          queryKey: ["getChatById", chatId],
        });
        console.log({ newMessageRecieved });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientId, chatId]);

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
            <ConvoHeader
              profileImage={getRecipient(userChat.data)?.photo?.thumbnail}
              name={getRecipient(userChat.data)?.name || ""}
            />
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
      <InputBox
        chatId={chatId}
        recipientId={recipientId}
        onChange={typingHandler}
      />
    </div>
  );
};

export default ConvoScreen;
