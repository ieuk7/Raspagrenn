'use client';

import { useEffect } from 'react';
import './account.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import {
  User as UserIcon,
  BookCopy,
  Receipt,
  LogOut,
  DollarSign,
  ArrowUpRight,
  Mail,
  Smartphone,
  FileText,
  Gift,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditInfoDialog } from '@/components/EditInfoDialog';
import { Progress } from '@/components/ui/progress';

// Define the user profile structure
interface UserProfile {
    id: string;
    email: string;
    username: string;
    phone?: string;
    document?: string;
    balance?: number;
    bonus_balance?: number;
    bonus_rollover_requirement?: number;
    bonus_rollover_progress?: number;
}

const formatPhoneForDisplay = (phoneStr: string | undefined | null) => {
    if (!phoneStr) return '';
    const cleaned = phoneStr.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d)(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phoneStr;
};


export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    // If auth state is resolved and there's no user, redirect to login page.
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);


  // Memoize the document reference to prevent re-renders
  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  // Fetch the user profile from Firestore
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/');
    });
  };

  const handleSave = async (field: string, value: string) => {
    if (!userDocRef) return;
    // We use setDoc with merge: true to create or update the document.
    setDocumentNonBlocking(userDocRef, { [field]: value }, { merge: true });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.substring(0, 1).toUpperCase();
  };

  // Show a loading indicator while checking auth status or fetching profile
  // The `user && isProfileLoading` part ensures we wait for profile only if a user is logged in.
  if (isUserLoading || (user && isProfileLoading)) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  // If there's no user after loading, the component will render nothing
  // while the useEffect redirects. This prevents showing any data.
  if (!user) {
    return null;
  }

  // Use auth data as a fallback while profile is loading
  const displayName = userProfile?.username || user?.displayName || user?.email?.split('@')[0] || '';
  const email = userProfile?.email || user?.email || '';
  const username = userProfile?.username || user?.email?.split('@')[0] || '';
  const phone = userProfile?.phone;
  const documentValue = userProfile?.document;
  const balance = userProfile?.balance ?? 0;
  const bonusBalance = userProfile?.bonus_balance ?? 0;
  const rolloverRequirement = userProfile?.bonus_rollover_requirement ?? 0;
  const rolloverProgress = userProfile?.bonus_rollover_progress ?? 0;

  const formattedBalance = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance);
  const formattedBonusBalance = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bonusBalance);

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
                <span className="stat-card-label">Saldo em conta</span>
                <span className="stat-card-value">{formattedBalance}</span>
                </div>
                <div className="stat-card-icon">
                <DollarSign />
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-card-info">
                <span className="stat-card-label">Saldo de Bônus</span>
                <span className="stat-card-value">{formattedBonusBalance}</span>
                </div>
                <div className="stat-card-icon">
                <Gift />
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
            </div>
        </div>
        
        {rolloverRequirement > 0 && (
            <div className="personal-info">
                <h2 className="personal-info-header">Progresso do Bônus</h2>
                <p className="text-sm text-muted-foreground mb-2">
                    Para converter seu saldo de bônus em saldo real, você precisa apostar um total de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rolloverRequirement)}.
                </p>
                <Progress value={(rolloverProgress / rolloverRequirement) * 100} className="w-full" />
                <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rolloverProgress)} / {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rolloverRequirement)}
                    </span>
                </div>
            </div>
        )}

        <div className="personal-info">
          <h2 className="personal-info-header">Informações Pessoais</h2>
          <div>
            <EditInfoDialog
              fieldLabel="Email"
              fieldId="email"
              currentValue={email}
              onSave={handleSave}
              icon={<Mail size={16} />}
              placeholder="seu@email.com"
            />
             <EditInfoDialog
              fieldLabel="Username"
              fieldId="username"
              currentValue={username}
              onSave={handleSave}
              icon={<UserIcon size={16} />}
              placeholder="Seu nome de usuário"
            />
            <EditInfoDialog
              fieldLabel="Telefone"
              fieldId="phone"
              currentValue={formatPhoneForDisplay(phone) || ''}
              onSave={handleSave}
              icon={<Smartphone size={16} />}
              placeholder="(00) 9 9999-9999"
            />
            <EditInfoDialog
              fieldLabel="Documento"
              fieldId="document"
              currentValue={documentValue || ''}
              onSave={handleSave}
              icon={<FileText size={16} />}
              placeholder="000.000.000-00"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
