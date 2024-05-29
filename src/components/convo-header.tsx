import * as React from "react";
import { Button } from "./ui/button";
import { EllipsisVertical, Heart } from "lucide-react";
const ConvoHeader = () => {
  return (
    <div className="flex items-center justify-between w-full pb-3">
      <div className="flex items-center gap-2">
        <div className="rounded-full size-[48px] bg-gray-200" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">
            Mullah <br />
            <span className="text-[#00C744] text-xs">online</span>
          </p>
        </div>
      </div>
      <div>
        <Button type="button" variant="ghost" size="icon">
          <Heart className="size-5" color="#101C26" />
        </Button>
        <Button type="button" variant="ghost" size="icon">
          <EllipsisVertical className="size-5" color="#101C26" />
        </Button>
      </div>
    </div>
  );
};

export default ConvoHeader;
