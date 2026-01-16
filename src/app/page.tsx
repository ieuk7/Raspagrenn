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
      src: 'https://ik.imagekit.io/cd7ikp5fv/IMG_4617.PNG',
      alt: 'Banner 1',
    },
    {
      src: 'https://ik.imagekit.io/cd7ikp5fv/IMG_4614.PNG',
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
                className="rounded-lg object-cover w-full"
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
