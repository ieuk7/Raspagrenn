'use client';

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
  ArrowDownLeft,
  Mail,
  Smartphone,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditInfoDialog } from '@/components/EditInfoDialog';

// Define the user profile structure
interface UserProfile {
    id: string;
    email: string;
    username: string;
    phone?: string;
    document?: string;
}

export default function AccountPage() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

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
    if (!name) return 'S';
    return name.substring(0, 1).toUpperCase();
  };

  // Use auth data as a fallback while profile is loading
  const displayName = userProfile?.username || user?.displayName || user?.email?.split('@')[0] || 'Shit Poster';
  const email = userProfile?.email || user?.email || 'ghkueigamer115@gmail.com';
  const username = userProfile?.username || user?.email?.split('@')[0] || 'CommodiQuod285';
  const phone = userProfile?.phone;
  const documentValue = userProfile?.document;

  if (isProfileLoading) {
    // Optional: show a loading state
    return <div>Carregando...</div>;
  }

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
              currentValue={phone || ''}
              onSave={handleSave}
              icon={<Smartphone size={16} />}
              placeholder="(00) 00000-0000"
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
