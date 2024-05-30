import * as React from "react";
import ConversationScreen from "@/components/conversation";
import ConvoHeader from "@/components/convo-header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConvoScreen = () => {
  return (
    <div className="relative flex h-screen min-h-[50vh] flex-col lg:col-span-2 p-4">
      <div className="flex-1 h-[95%]">
        <div className="h-[7%]">
          <ConvoHeader />
          <hr />
        </div>
        <div className="h-[93%]">
          <ConversationScreen />
        </div>
      </div>
      <form className="flex gap-4 items-center h-[5%]">
        <div className="relative overflow-hidden rounded-3xl  w-full">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
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
          <Button type="button" size="icon">
            <Send className="size-5" />
            <span className="sr-only">Use Microphone</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConvoScreen;
