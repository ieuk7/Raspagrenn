'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { useState } from 'react';
import './header.css';

export function Header() {
  const { user, isUserLoading } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [initialView, setInitialView] = useState<'login' | 'register'>('login');

  const openAuthDialog = (view: 'login' | 'register') => {
    setInitialView(view);
    setIsLoginOpen(true);
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <header className="header">
        <div className="header-left">
            <Link href="/">
              <Image
                src="https://ik.imagekit.io/cd7ikp5fv/raspa-green-logo.png"
                alt="Raspa Green Logo"
                width={120}
                height={40}
                className="logo-img"
              />
            </Link>
        </div>

        <nav className="header-center">
            <Link href="/" className="nav-item">
              <HomeIcon /> Inicio
            </Link>
            <Link href="#" className="nav-item">
              <Star /> Raspadinhas
            </Link>
            <Link href="/referral" className="nav-item">
              <Gift /> Indique e Ganhe
            </Link>
        </nav>

        <div className="flex items-center">
           {isUserLoading ? (
            <div className="h-10 w-64 bg-zinc-800 rounded-md animate-pulse" />
          ) : user ? (
            <UserNav />
          ) : (
            <div className="header-right">
              <Button variant="ghost" onClick={() => openAuthDialog('login')}>Entrar</Button>
              <Button onClick={() => openAuthDialog('register')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Registrar
              </Button>
            </div>
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
        <LoginPage onAuthSuccess={() => setIsLoginOpen(false)} initialView={initialView} />
      </DialogContent>
    </Dialog>
  );
}
