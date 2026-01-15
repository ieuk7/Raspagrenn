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
  Gift,
  Home as HomeIcon,
  Star,
  UserPlus,
} from 'lucide-react';
import { ScratchCards } from '@/components/ScratchCards';
import { Footer } from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import LoginPage from './login/page';
import { useUser } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { WinnersTicker } from '@/components/WinnersTicker';
import { UserNav } from '@/components/UserNav';

export default function HomePage() {
  const { user, isUserLoading } = useUser();
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
    <Dialog>
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
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Início
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Star className="h-4 w-4" />
                Raspadinhas
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Gift className="h-4 w-4" />
                Indique e Ganhe
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
             {isUserLoading ? (
              <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
            ) : user ? (
              <UserNav />
            ) : (
              <>
                <DialogTrigger asChild>
                  <Button variant="ghost">Entrar</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrar
                  </Button>
                </DialogTrigger>
              </>
            )}
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
          <WinnersTicker />
          <ScratchCards />
        </main>
        <Footer />
        <Toaster />
      </div>
      <DialogContent className="p-0 bg-transparent border-none max-w-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>Login ou Registro</DialogTitle>
          <DialogDescription>
            Acesse sua conta ou crie uma nova para começar a jogar.
          </DialogDescription>
        </DialogHeader>
        <LoginPage />
      </DialogContent>
    </Dialog>
  );
}
