import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FavouriteCarousel = ({ text }: { text: string }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-sm font-medium">{text}</p>
        <p className="text-sm font-medium mr-7">{23}</p>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/5">
              <div className="p-1">
                <div className="size-[64px] rounded-full bg-slate-500" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-9" />
        <CarouselNext className="mr-9" />
      </Carousel>
    </div>
  );
};

export default FavouriteCarousel;
