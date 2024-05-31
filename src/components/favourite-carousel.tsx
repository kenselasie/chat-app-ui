"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getUserByID } from "@/app/(dashboard)/chat/actions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/const/routes";

const FavouriteCarousel = ({
  text,
  userId,
}: {
  text: string;
  userId: string;
}) => {
  const { data: userDetails, isLoading: isLoadingUserDetails } = useQuery({
    queryKey: ["getUserByID"],
    queryFn: () => getUserByID({ id: userId }),
  });

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-sm font-medium">{text}</p>
        <p className="text-sm font-medium mr-7">
          {userDetails?.favChat?.length}
        </p>
      </div>
      {userDetails && userDetails?.favChat.length > 0 ? (
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {userDetails?.favChat.map((favChat, index) => (
              <CarouselItem key={index} className="pl-1 basis-1/5">
                <div className="flex flex-col items-center">
                  {favChat.users.length > 1 &&
                  favChat.users.filter((el) => el.id !== userDetails?.id)[0]
                    ?.photo?.thumbnail ? (
                    <Link
                      href={ROUTES.CHAT_DASHBOARD({
                        recipientId: favChat.users.filter(
                          (el) => el.id !== userDetails?.id
                        )[0].id,
                        chatId: favChat.id,
                      })}
                      className="p-1"
                    >
                      <Image
                        src={`/uploads/${
                          favChat.users.filter(
                            (el) => el.id !== userDetails?.id
                          )[0].photo?.thumbnail
                        }`}
                        width={48}
                        height={48}
                        alt="profile-img"
                        className="rounded-full min-h-[64px] min-w-[64px] borer border-2"
                      />
                    </Link>
                  ) : (
                    <Link
                      href={ROUTES.CHAT_DASHBOARD({
                        recipientId: favChat.users.filter(
                          (el) => el.id !== userDetails?.id
                        )[0].id,
                        chatId: favChat.id,
                      })}
                      className="p-1"
                    >
                      <div className="grid place-items-center size-[64px] bg-[#DDE7F2] text-[#094C97] rounded-full">
                        {(
                          favChat.users.filter(
                            (el) => el.id !== userDetails?.id
                          )[0]?.name || ""
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    </Link>
                  )}
                  <p className="truncate text-xs font-bold text-center max-w-12 w-full">
                    {
                      favChat.users.filter((el) => el.id !== userDetails?.id)[0]
                        ?.name
                    }
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-9" />
          <CarouselNext className="mr-9" />
        </Carousel>
      ) : (
        <p className="text-xs font-bold text-center">No favourites</p>
      )}
    </div>
  );
};

export default FavouriteCarousel;
