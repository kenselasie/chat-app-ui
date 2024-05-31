import * as React from "react";
import { Button } from "./ui/button";
import { EllipsisVertical, Heart } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

type ConvoHeaderProps = {
  name: string;
  profileImage?: string;
  onMakeFav: () => void;
  isChatFavourite: boolean;
};

const ConvoHeader = ({
  name,
  profileImage,
  isChatFavourite,
  onMakeFav,
}: ConvoHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full pb-3">
      <div className="flex items-center gap-2">
        {profileImage ? (
          <Image
            src={`/uploads/${profileImage}`}
            width={48}
            height={48}
            alt="profile-img"
            className="rounded-full min-h-[48px] min-w-[48px] borer border-2"
          />
        ) : (
          <Avatar>
            <AvatarFallback className="bg-[#DDE7F2] text-[#094C97]">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">
            {name} <br />
            <span className="text-[#00C744] text-xs">online</span>
          </p>
        </div>
      </div>
      <div>
        <Button onClick={onMakeFav} type="button" variant="ghost" size="icon">
          <Heart className="size-5" fill={isChatFavourite ? "red" : "white"} />
        </Button>
        <Button type="button" variant="ghost" size="icon">
          <EllipsisVertical className="size-5" color="#101C26" />
        </Button>
      </div>
    </div>
  );
};

export default ConvoHeader;
