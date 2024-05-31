"use client";
import * as React from "react";
import { ChevronDown, Mic, Paperclip, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePen } from "lucide-react";
import chatIcon from "@/assets/chat.svg";
import Image from "next/image";
import FavouriteCarousel from "@/components/favourite-carousel";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserByID, searchChats } from "./actions";
import { authStore } from "@/store/authStore";
import ConvoScreen from "./ConvoScreen";
import EmptyConvo from "./EmptyConvo";
import ChatCell from "@/components/chat-cell";
import ChatUserCell from "@/components/chat-user-cell";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  const { data: userDetails, isLoading: isLoadingUserDetails } = useQuery({
    queryKey: ["getUserByID"],
    queryFn: () => getUserByID({ id: authStore.userDetails?.id! }),
  });
  const [searchString, setSearchString] = React.useState("");
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId") || "";
  const chatId = searchParams.get("chatId") || "";

  const {
    data: chats,
    refetch,
    isLoading: isLoadingChats,
    error: chatError,
  } = useQuery({
    queryKey: ["getMyChats", searchString],
    queryFn: () =>
      searchChats({
        userId: authStore?.userDetails?.id || "",
        searchTerm: searchString,
      }),
  });

  const {
    data: usersData,
    isLoading: isLoadingUser,
    error: usersError,
  } = useQuery({
    queryKey: ["getUsers", searchString],
    queryFn: () => getAllUsers({}),
  });

  React.useEffect(() => {
    const getData = setTimeout(() => {
      refetch();
    }, 1500);

    return () => clearTimeout(getData);
  }, [searchString]);

  if (isLoadingUserDetails)
    return <div className="grid place-items-center">Loading...</div>;

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col border-r max-h-screen overflow-scroll h-screen items-start gap-8 md:flex p-4">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2">
                {userDetails?.photo ? (
                  <Image
                    src={userDetails.photo.thumbnail}
                    width={48}
                    height={48}
                    alt="profile-img"
                  />
                ) : (
                  <div className="rounded-full size-[48px] bg-gray-200" />
                )}
                <p className="font-semibold">{userDetails?.name}</p>
                <ChevronDown size={18} />
              </div>
              <Button>
                <FilePen />
              </Button>
            </div>
            <div className="w-full">
              <Input
                className={"w-full"}
                id="username"
                type="text"
                value={searchString}
                onChange={(event) => setSearchString(event.target.value)}
                placeholder="Search for chatter or message"
              />
            </div>
            {userDetails?.status === "COMPLETE" ? (
              <>
                <div className="flex w-full justify-center">
                  <FavouriteCarousel text={"Favourite chatters"} />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full">
                  {chats?.map((chat, index) => (
                    <div className="w-full" key={index}>
                      <ChatCell recipientId={recipientId} chat={chat} />
                    </div>
                  ))}
                  <p className="text-xs font-bold text-center">New Chats</p>
                  {usersData?.map((usr, index) => (
                    <div className="w-full" key={index}>
                      <ChatUserCell user={usr} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="size-full">
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
          {userDetails?.status === "COMPLETE" && recipientId && chatId ? (
            <ConvoScreen />
          ) : (
            <EmptyConvo
              name={userDetails?.name || ""}
              id={userDetails?.id || ""}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;
