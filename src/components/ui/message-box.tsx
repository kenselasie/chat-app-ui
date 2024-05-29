import { format } from "date-fns";
import { MoveUpLeft } from "lucide-react";
import * as React from "react";

type MessageBoxProps = {
  type: "receiving" | "sending";
  text: string;
  date: string;
};

const MessageBox = ({ type, text, date }: MessageBoxProps) => {
  if (type === "receiving") {
    return (
      <div className="flex gap-1">
        <div className="rounded-full size-[32px] bg-gray-200" />
        <div className="flex flex-col justify-center bg-[#F1F1F1] size-fit max-w-[500px] rounded-[32px] min-h-[58px] p-5">
          <p className="text-xs">{format(date, "H:mm aaa")}</p>
          <p className="text-base">{text}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-1 text-end">
      <MoveUpLeft color="#289DFE" className="self-end" />
      <div className="flex flex-col justify-center bg-[#101C26] text-white size-fit max-w-[500px] rounded-[32px] min-h-[58px] p-5">
        <p className="text-xs">{format(date, "H:mm aaa")}</p>
        <p className="text-base">{text}</p>
      </div>
      <div className="rounded-full size-[32px] bg-gray-200" />
    </div>
  );
};

export default MessageBox;
