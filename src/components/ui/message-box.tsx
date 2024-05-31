import * as React from "react";
import { format } from "date-fns";
import { MoveUpLeft } from "lucide-react";
import Image from "next/image";

type MessageBoxProps = {
  type: "receiving" | "sending";
  content: string;
  date: Date;
  image?: string;
};

const MessageBox = ({ type, content, date, image }: MessageBoxProps) => {
  if (type === "receiving") {
    return (
      <div className="flex gap-1">
        {image ? (
          <Image
            src={`/uploads/${image}`}
            width={32}
            height={32}
            alt="profile-img"
            className="rounded-full max-h-[32px] max-w-[32px]"
          />
        ) : (
          <div className="rounded-full size-[32px] bg-gray-200" />
        )}
        <div className="flex flex-col justify-center bg-[#F1F1F1] size-fit max-w-[500px] rounded-[32px] min-h-[58px] p-4">
          <p className="text-xs">{format(date, "hh:mm aaa")}</p>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-1 text-end">
      <MoveUpLeft color="#289DFE" className="self-end" />
      <div className="flex flex-col justify-center bg-[#101C26] text-white size-fit max-w-[500px] rounded-[32px] min-h-[58px] p-4">
        <p className="text-xs">{format(date, "hh:mm aaa")}</p>
        <p className="text-sm">{content}</p>
      </div>
      {image ? (
        <Image
          src={`/uploads/${image}`}
          width={32}
          height={32}
          alt="profile-img"
          className="rounded-full max-h-[32px] max-w-[32px]"
        />
      ) : (
        <div className="rounded-full size-[32px] bg-gray-200" />
      )}
    </div>
  );
};

export default MessageBox;
