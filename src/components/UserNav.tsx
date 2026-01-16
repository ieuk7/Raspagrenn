'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import {
  ChevronDown,
  Landmark,
  LogOut,
  WalletCards,
  User as UserIcon,
  Gamepad2,
  Receipt,
  Wallet,
} from 'lucide-react';
import { DepositModal } from './DepositModal';
import { WithdrawModal } from './WithdrawModal';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import './header.css';


interface UserProfile {
  balance?: number;
  username?: string;
  email?: string;
}

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile } = useDoc<UserProfile>(userDocRef);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.substring(0, 1).toUpperCase();
  };

  const displayName = userProfile?.username || user?.displayName || user?.email?.split('@')[0] || 'User';
  
  const balance = userProfile?.balance ?? 0;
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  return (
      <div className="header-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <button className="balance-box">
                {formattedBalance} <ChevronDown size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-4" align="end">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-primary">{formattedBalance}</span>
                <span className="text-muted-foreground">Saldo</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-primary">R$ 0,00</span>
                <span className="text-muted-foreground">Bônus</span>
              </div>
            </div>
            <DropdownMenuSeparator className="my-3" />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-bold text-lg text-primary">{formattedBalance}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                O saldo total é a soma do seu saldo e bônus.
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog>
          <DialogTrigger asChild>
            <button className="btn-action btn-deposit">
                <Wallet />
                <span className="btn-text">Depositar</span>
            </button>
          </DialogTrigger>
          <DialogContent data-form="pix">
            <DepositModal />
          </DialogContent>
        </Dialog>
        
        <Dialog>
            <DialogTrigger asChild>
                <button className="btn-action btn-withdraw">
                    <WalletCards />
                    <span className="btn-text">Sacar</span>
                </button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none">
               <DialogHeader className="sr-only">
                  <DialogTitle>Saque</DialogTitle>
                  <DialogDescription>
                    Faça um saque da sua conta.
                  </DialogDescription>
                </DialogHeader>
                <WithdrawModal />
            </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <button className="user-profile">
                <div className="avatar-circle">{getInitials(displayName)}</div>
                <span className="user-name">{displayName}</span>
                <ChevronDown className="arrow-icon" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
             <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Conta</span>
                </DropdownMenuItem>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <WalletCards className="mr-2 h-4 w-4" />
                        <span>Sacar</span>
                    </DropdownMenuItem>
                </DialogTrigger>
                 <DialogContent className="p-0 bg-transparent border-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Saque</DialogTitle>
                        <DialogDescription>
                            Faça um saque da sua conta.
                        </DialogDescription>
                    </DialogHeader>
                    <WithdrawModal />
                </DialogContent>
              </Dialog>
              <DropdownMenuItem>
                <Gamepad2 className="mr-2 h-4 w-4" />
                <span>Histórico de Jogos</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Receipt className="mr-2 h-4 w-4" />
                <span>Transações</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => auth.signOut()}
              className="text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}
