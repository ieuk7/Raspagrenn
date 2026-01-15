'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  Gift,
  Home as HomeIcon,
  Star,
  User,
  DollarSign,
  PlusCircle,
  ArrowRightCircle,
  UserPlus,
} from 'lucide-react';

export default function Home() {
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-8">
          <Image
            src="https://ik.imagekit.io/cd7ikp5fv/raspa-green-logo.png"
            alt="Raspa Green Logo"
            width={120}
            height={40}
          />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <HomeIcon className="h-4 w-4" />
              Início
            </Link>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <Star className="h-4 w-4" />
              Raspadinhas
            </Link>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <Gift className="h-4 w-4" />
              Indique e Ganhe
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Entrar</Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Registrar
          </Button>
        </div>
      </header>
      <main className="p-4 md:p-8">
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
      </main>
    </div>
  );
}
