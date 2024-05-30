"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessageToChat } from "./actions";
import { authStore } from "@/store/authStore";
import { toast } from "sonner";

type InputBoxProps = {
  chatId: string;
};
const InputBox = ({ chatId }: InputBoxProps) => {
  const [messageText, setMessageText] = React.useState("");
  const queryClient = useQueryClient();

  const { mutate: sendMessageService, isPending: isSendingMsg } = useMutation({
    mutationKey: ["sendMessageToChat"],
    mutationFn: (variables: {
      chatId: string;
      senderId: string;
      content: string;
    }) => sendMessageToChat(variables),
  });

  const sendMessage = () => {
    if (!messageText) return;
    sendMessageService(
      {
        chatId,
        senderId: authStore.userDetails?.id || "",
        content: messageText,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data.message);
        },
        onError: (err) => {
          const error = err as any;
          toast.error(error?.message || "Message not sent");
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ["getChatById", chatId],
          });
        },
      }
    );
  };
  return (
    <div className="flex gap-4 items-center h-[5%]">
      <div className="relative overflow-hidden rounded-3xl  w-full">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          id="message"
          placeholder="Type your message"
          className="bg-[#F7F7F7] min-h-12 resize-none border-0 shadow-none placeholder:pt-2"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon">
            <Smile className="size-5" color="#101C26" />
            <span className="sr-only">Use Microphone</span>
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="size-5" color="#101C26" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <Mic className="size-5" color="#101C26" />
            <span className="sr-only">Use Microphone</span>
          </Button>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          size="icon"
          onClick={sendMessage}
          disabled={messageText.length <= 0 || isSendingMsg}
        >
          <Send className="size-5" />
          <span className="sr-only">Use Microphone</span>
        </Button>
      </div>
    </div>
  );
};

export default InputBox;
