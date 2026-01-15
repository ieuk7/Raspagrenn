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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import {
  ChevronDown,
  Landmark,
  LogOut,
  WalletCards,
  User as UserIcon,
  Gamepad2,
  Receipt,
} from 'lucide-react';
import { DepositModal } from './DepositModal';

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'S';
    return name.substring(0, 1).toUpperCase();
  };

  const displayName =
    user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <Dialog>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2 p-2 h-10 bg-zinc-800 hover:bg-zinc-700 text-white">
              R$ 0,00
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-4" align="end">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-primary">R$ 0,00</span>
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
                <span className="font-bold text-lg text-primary">R$ 0,00</span>
              </div>
              <p className="text-xs text-muted-foreground">
                O saldo total é a soma do seu saldo e bônus.
              </p>
            </div>
            <DropdownMenuItem asChild className="mt-4 p-0 focus:bg-transparent">
              <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold">
                <WalletCards className="mr-2 h-4 w-4" />
                Sacar
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-black font-bold flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            Depositar
          </Button>
        </DialogTrigger>

        <Button className="bg-primary hover:bg-primary/90 text-black font-bold flex items-center gap-2">
          <WalletCards className="h-4 w-4" />
          Sacar
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-auto flex items-center justify-start gap-2 p-0 focus-visible:ring-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photoURL || ''} alt={displayName} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{displayName}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
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
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Conta</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <WalletCards className="mr-2 h-4 w-4" />
                <span>Sacar</span>
              </DropdownMenuItem>
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
      <DialogContent className="p-0 bg-transparent border-none max-w-fit">
        <DialogHeader className="sr-only">
          <DialogTitle>Depósito</DialogTitle>
          <DialogDescription>
            Faça um depósito para adicionar fundos à sua conta.
          </DialogDescription>
        </DialogHeader>
        <DepositModal />
      </DialogContent>
    </Dialog>
  );
}
