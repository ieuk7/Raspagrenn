'use client';

import './account.css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser, useAuth } from '@/firebase';
import {
  User as UserIcon,
  BookCopy,
  Receipt,
  LogOut,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Pencil,
  Mail,
  Smartphone,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/');
    });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'S';
    return name.substring(0, 1).toUpperCase();
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Shit Poster';
  const email = user?.email || 'ghkueigamer115@gmail.com';
  const username = user?.displayName || 'CommodiQuod285';

  return (
    <div className="account-container">
      <aside className="account-sidebar">
        <div className="account-profile">
          <Avatar className="avatar">
            <AvatarImage src={user?.photoURL || ''} alt={displayName} />
            <AvatarFallback className="avatar-fallback">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <p className="account-profile-name">{displayName}</p>
          <p className="account-profile-date">Entrou em Aug 03, 2025</p>
        </div>
        <nav className="account-nav">
          <ul>
            <li>
              <Link href="/account" className="account-nav-link active">
                <UserIcon size={20} />
                Conta
              </Link>
            </li>
            <li>
              <Link href="#" className="account-nav-link">
                <BookCopy size={20} />
                Histórico de Jogos
              </Link>
            </li>
            <li>
              <Link href="#" className="account-nav-link">
                <Receipt size={20} />
                Transações
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className="account-nav-link logout w-full">
                <LogOut size={20} />
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="account-main">
        <div>
            <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
            <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-card-info">
                <span className="stat-card-label">Total Depositado</span>
                <span className="stat-card-value">R$ 0,00</span>
                </div>
                <div className="stat-card-icon">
                <ArrowDownLeft />
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-card-info">
                <span className="stat-card-label">Total Retirado</span>
                <span className="stat-card-value">R$ 0,00</span>
                </div>
                <div className="stat-card-icon">
                <ArrowUpRight />
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-card-info">
                <span className="stat-card-label">Ganho em Cashback</span>
                <span className="stat-card-value">R$ 0,00</span>
                </div>
                <div className="stat-card-icon">
                <DollarSign />
                </div>
            </div>
            </div>
        </div>

        <div className="personal-info">
          <h2 className="personal-info-header">Informações Pessoais</h2>
          <div>
            <div className="info-item">
              <div>
                <p className="info-item-label">Email</p>
                <p className="info-item-value">
                  <Mail size={16} />
                  <span>{email}</span>
                </p>
              </div>
              <Button className="edit-button">
                <Pencil size={14} />
                Editar
              </Button>
            </div>
            <div className="info-item">
              <div>
                <p className="info-item-label">Username</p>
                <p className="info-item-value">
                  <UserIcon size={16} />
                  <span>{username}</span>
                </p>
              </div>
              <Button className="edit-button">
                <Pencil size={14} />
                Editar
              </Button>
            </div>
            <div className="info-item">
              <div>
                <p className="info-item-label">Telefone</p>
                <p className="info-item-value">
                  <Smartphone size={16} />
                  <span>(00) 0000-0000</span>
                </p>
              </div>
              <Button className="edit-button">
                <Pencil size={14} />
                Editar
              </Button>
            </div>
            <div className="info-item">
              <div>
                <p className="info-item-label">Documento</p>
                <p className="info-item-value">
                  <FileText size={16} />
                  <span>000.000.000-00</span>
                </p>
              </div>
              <Button className="edit-button">
                <Pencil size={14} />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
