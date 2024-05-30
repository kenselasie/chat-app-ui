import * as React from "react";
import MessageBox from "./ui/message-box";

const ConversationScreen = () => {
  const messages = [
    {
      type: "receiving",
      text: "I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "sending",
      text: "I finish oo I dey office I finish oo I dey office a very long message I finish oo I dey office I finish oo I dey office  I finish oo I dey office I finish oo I dey office I finish oo I dey office I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "receiving",
      text: "I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "sending",
      text: "I finish oo I dey office I finish oo I dey office a very long message I finish oo I dey office I finish oo I dey office  I finish oo I dey office I finish oo I dey office I finish oo I dey office I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "receiving",
      text: "I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "sending",
      text: "I finish oo I dey office I finish oo I dey office a very long message I finish oo I dey office I finish oo I dey office  I finish oo I dey office I finish oo I dey office I finish oo I dey office I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "receiving",
      text: "I finish oo I dey office",
      date: new Date().toISOString(),
    },
    {
      type: "sending",
      text: "I finish oo I dey office I finish oo I dey office a very long message I finish oo I dey office I finish oo I dey office  I finish oo I dey office I finish oo I dey office I finish oo I dey office I finish oo I dey office",
      date: new Date().toISOString(),
    },
  ] as const;
  return (
    <section className="flex flex-col gap-3 h-full overflow-y-scroll mt-5">
      <div className="mb-20">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            {message.type === "sending" ? (
              <div className="flex justify-between">
                <div />
                <MessageBox
                  type={message.type}
                  text={message.text}
                  date={new Date().toISOString()}
                />
              </div>
            ) : (
              <div>
                <MessageBox
                  type={message.type}
                  text={message.text}
                  date={new Date().toISOString()}
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
