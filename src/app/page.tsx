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
  LogOut,
  Star,
  UserPlus,
} from 'lucide-react';
import { ScratchCards } from '@/components/ScratchCards';
import { Footer } from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import LoginPage from './login/page';
import { useUser, useAuth } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

const WinnersTicker = () => (
  <>
    <div className="live-bar-container">
      <div className="live-indicator">
        <div className="live-dot"></div>
        <span className="text-ao">AO</span>
        <span className="text-vivo">VIVO</span>
      </div>

      <div className="ticker-wrapper">
        <div className="ticker-track">
          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C8 2 4 5 4 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-5v8h3c1.66 0 3-1.34 3-3V9c0-4-4-7-8-7z"
                  fill="#ddd"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Filipe Ga****</span>
              <span className="prize-name">Air Pods Pro 3</span>
              <span className="prize-value">R$ 2.500,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"
                  fill="#ddd"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Lara Va******</span>
              <span className="prize-name">GoPro Hero</span>
              <span className="prize-value">R$ 2.500,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#777" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fill="#000"
                  fontSize="12"
                  fontWeight="bold"
                >
                  $
                </text>
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Elizabeth Ma******</span>
              <span className="prize-name">0,50 Centavos</span>
              <span className="prize-value">R$ 0,50</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM11 3h2v3h-2V3zm7 16H6V8h12v11z"
                  fill="#ddd"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Gilberto Pa**</span>
              <span className="prize-name">Mala Rimowa</span>
              <span className="prize-value">R$ 10.000,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  fill="#85bb65"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Evandro Ro*******</span>
              <span className="prize-name">500000 Reais</span>
              <span className="prize-value">R$ 50.000,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                  fill="#9b59b6"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Ian da*****</span>
              <span className="prize-name">Controle Xbox</span>
              <span className="prize-value">R$ 700,00</span>
            </div>
          </div>

          {/* Duplicated for smooth scrolling */}
          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C8 2 4 5 4 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-5v8h3c1.66 0 3-1.34 3-3V9c0-4-4-7-8-7z"
                  fill="#ddd"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Filipe Ga****</span>
              <span className="prize-name">Air Pods Pro 3</span>
              <span className="prize-value">R$ 2.500,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"
                  fill="#ddd"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Lara Va******</span>
              <span className="prize-name">GoPro Hero</span>
              <span className="prize-value">R$ 2.500,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#777" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fill="#000"
                  fontSize="12"
                  fontWeight="bold"
                >
                  $
                </text>
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Elizabeth Ma******</span>
              <span className="prize-name">0,50 Centavos</span>
              <span className="prize-value">R$ 0,50</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM11 3h2v3h-2V3zm7 16H6V8h12v11z"
                  fill="#ddd"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Gilberto Pa**</span>
              <span className="prize-name">Mala Rimowa</span>
              <span className="prize-value">R$ 10.000,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  fill="#85bb65"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Evandro Ro*******</span>
              <span className="prize-name">500000 Reais</span>
              <span className="prize-value">R$ 50.000,00</span>
            </div>
          </div>

          <div className="winner-card">
            <div className="prize-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                  fill="#9b59b6"
                />
              </svg>
            </div>
            <div className="card-info">
              <span className="winner-name">Ian da*****</span>
              <span className="prize-name">Controle Xbox</span>
              <span className="prize-value">R$ 700,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default function HomePage() {
  const { user } = useUser();
  const auth = useAuth();
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
            {user ? (
              <Button onClick={() => auth.signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
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
