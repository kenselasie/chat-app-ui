import * as React from "react";
import MessageBox from "./ui/message-box";
import { Prisma } from "@prisma/client";

type ConversationScreenProps = {
  messages: Prisma.MessageGetPayload<{
    include: {
      sender: true;
    };
  }>[];
  userId: string;
};
const ConversationScreen = ({ messages, userId }: ConversationScreenProps) => {
  return (
    <section className="flex flex-col gap-3 h-full overflow-y-scroll mt-5">
      <div className="mb-20">
        {messages &&
          messages?.map((message, index) => (
            <div key={index} className="mb-4">
              {message?.senderId === userId ? (
                <div className="flex justify-between">
                  <div />
                  <MessageBox
                    type={"sending"}
                    content={message.content}
                    date={message.createdAt}
                  />
                </div>
              ) : (
                <div>
                  <MessageBox
                    type={"receiving"}
                    content={message.content}
                    date={message.createdAt}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default ConversationScreen;
