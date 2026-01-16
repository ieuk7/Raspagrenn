'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Gift,
  Home as HomeIcon,
  Star,
  UserPlus,
} from 'lucide-react';
import LoginPage from '@/app/login/page';
import { useUser } from '@/firebase';
import { UserNav } from '@/components/UserNav';

export function Header() {
  const { user, isUserLoading } = useUser();

  return (
    <Dialog>
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
