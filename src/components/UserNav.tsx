'use client';

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

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'S';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  const displayName =
    user?.displayName || user?.email?.split('@')[0] || 'Shit Poster';

  return (
    <div className="flex items-center gap-4">
      <Button className="hidden md:flex items-center gap-2 p-2 h-10 bg-zinc-800 hover:bg-zinc-700 text-white">
        R$ 0,00
        <ChevronDown className="h-4 w-4" />
      </Button>

      <Button className="bg-primary hover:bg-primary/90 text-black font-bold flex items-center gap-2">
        <Landmark className="h-4 w-4" />
        <span className='hidden md:block'>Depositar</span>
      </Button>
      <Button className="bg-primary hover:bg-primary/90 text-black font-bold flex items-center gap-2">
        <WalletCards className="h-4 w-4" />
        <span className='hidden md:block'>Sacar</span>
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
            <span className="hidden md:block">{displayName}</span>
            <ChevronDown className="h-4 w-4 hidden md:block" />
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
          <DropdownMenuItem onClick={() => auth.signOut()} className='text-red-500 focus:text-red-500'>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
