"use client";
import { ChevronDown, Mic, Paperclip, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FilePen } from "lucide-react";
import chatIcon from "@/assets/chat.svg";
import Image from "next/image";
import ConversationScreen from "@/components/conversation";
import ConvoHeader from "@/components/convo-header";
import FavouriteCarousel from "@/components/favourite-carousel";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./actions";

const Chat = async () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getAllUsers({}),
  });

  console.log({ data });
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col border-r h-screen items-start gap-8 md:flex p-4">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="rounded-full size-[48px] bg-gray-200"></div>
                <p className="font-semibold">Kojo Trip</p>
                <ChevronDown size={18} />
              </div>
              <Button>
                <FilePen />
              </Button>
            </div>
            {true && (
              <>
                <div className="flex w-full justify-center">
                  <FavouriteCarousel text={"Favourite chatters"} />
                </div>
                {"Usser here"}
              </>
            )}
            {false && (
              <div className="size-full">
                <Input
                  placeholder="Search for chatter or message"
                  className="w-full"
                />
                <div className="flex flex-col h-[75vh] justify-center items-center">
                  <Image src={chatIcon} alt="chatIcon" width="86" height="86" />
                  <p className="text-[#B5BDC5] text-center">
                    Your Chatteree conversations <br />
                    live here
                  </p>
                </div>
              </div>
            )}
          </div>
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
        </main>
      </div>
    </div>
  );
};

export default Chat;
