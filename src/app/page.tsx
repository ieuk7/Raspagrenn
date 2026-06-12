'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ScratchCards } from '@/components/ScratchCards';
import { WinnersTicker } from '@/components/WinnersTicker';

export default function HomePage() {
  const banners = [
    {
      src: 'https://s3.typebotstorage.com/public/workspaces/cm50sof1200086yjtr125akew/typebots/cmqbcpqvu00000bjjs4gus99e/blocks/c9wv27pu0cb7oy43nvnaeoso?v=1781294449487',
      alt: 'Banner 1',
    },
    {
      src: 'https://s3.typebotstorage.com/public/workspaces/cm50sof1200086yjtr125akew/typebots/cmqbcpqvu00000bjjs4gus99e/blocks/zw58bvvehmfke6fcb8jyme0g?v=1781294782157',
      alt: 'Banner 2',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Image
                src={banner.src}
                alt={banner.alt}
                width={1280}
                height={400}
                className="rounded-lg object-cover w-full aspect-[16/5]"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
      <WinnersTicker />
      <ScratchCards />
    </div>
  );
}
