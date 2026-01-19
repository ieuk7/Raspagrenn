'use client';

import { useState } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, runTransaction, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gem, Upload, Users, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './referral.css';
import { cn } from '@/lib/utils';


interface UserProfile {
    id: string;
    email: string;
    username: string;
    referralCode?: string;
    commission?: number;
    xp?: number;
    level?: number;
    totalCommission?: number;
    referralsCount?: number;
}

export default function ReferralPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();

    const [newCode, setNewCode] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    
    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    const handleCreateCode = async () => {
        if (!userDocRef || !newCode.trim() || !user) {
            toast({ title: "Código inválido", description: "Por favor, insira um código.", variant: "destructive" });
            return;
        }
        if (userProfile?.referralCode) {
            toast({ title: "Código já existe", description: "Você já criou um código de referência.", variant: "destructive" });
            return;
        }

        const code = newCode.trim().toLowerCase();

        if (code.length < 3 || !/^[a-z0-9]+$/.test(code)) {
             toast({ title: "Código inválido", description: "O código deve ter pelo menos 3 caracteres e conter apenas letras minúsculas e números.", variant: "destructive" });
            return;
        }

        setIsCreating(true);

        try {
            const referralCodeRef = doc(firestore, 'referralCodes', code);

            await runTransaction(firestore, async (transaction) => {
                const referralCodeDoc = await transaction.get(referralCodeRef);
                if (referralCodeDoc.exists()) {
                    throw new Error("Este código já está em uso. Tente outro.");
                }

                transaction.set(referralCodeRef, { userId: user.uid });
                transaction.update(userDocRef, { referralCode: code });
            });

            toast({ title: "Código criado com sucesso!" });
            setNewCode('');
        } catch (error: any) {
            toast({ title: "Erro ao criar código", description: error.message, variant: "destructive" });
        } finally {
            setIsCreating(false);
        }
    };
    
    const handleCopyToClipboard = () => {
        if (userProfile?.referralCode) {
            const link = `${window.location.origin}/r/${userProfile.referralCode}`;
            navigator.clipboard.writeText(link);
            toast({ title: "Link copiado para a área de transferência!" });
        }
    };
    
    const getInitials = (email: string | undefined) => {
        if (!email) return 'U';
        return email.substring(0, 1).toUpperCase();
    };

    if (isUserLoading || (user && isProfileLoading)) {
        return <div className="flex h-[calc(100vh-70px)] items-center justify-center">Carregando...</div>;
    }
    
    if (!user || !userProfile) {
        return null;
    }
    
    const referralLink = userProfile.referralCode ? `${window.location.origin}/r/${userProfile.referralCode}` : `${window.location.origin}/r/`;

    const formattedTotalCommission = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(userProfile.totalCommission || 0);

    return (
        <div className="referral-container">
            <div className="profile-card">
                <Avatar className="profile-avatar">
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                </Avatar>
                <p className="profile-email">{user.email}</p>
                <div className="profile-level">
                    <Gem size={14} /> Nível {userProfile.level || 1}
                </div>
                <div className="commission-info">
                    <span>Comissão {userProfile.commission || 50}%</span>
                </div>
                <Progress value={(userProfile.xp || 0) / 10} className="xp-progress" />
                <div className="xp-details">
                    <span>{userProfile.xp || 0} / 1.000 XP</span>
                    <span>Nível {userProfile.level || 1}</span>
                </div>
                <Button className="levels-button">Ver níveis</Button>
            </div>
            
            <div className="referral-main-content">
                 <div className="stats-card-grid">
                    <div className="referral-stat-card">
                        <Wallet size={24} className="stat-icon" />
                        <div>
                            <p className="stat-label">Ganhos de Comissão</p>
                            <p className="stat-value">{formattedTotalCommission}</p>
                        </div>
                    </div>
                     <div className="referral-stat-card">
                        <Users size={24} className="stat-icon" />
                        <div>
                            <p className="stat-label">Total de Indicados</p>
                            <p className="stat-value">{userProfile.referralsCount || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="referral-card">
                    <h2 className="referral-title">Link de referência</h2>
                    <div className="code-creation-box">
                        <label>Seu Código</label>
                        <div className="code-input-wrapper">
                            <span>r/</span>
                            {userProfile.referralCode ? (
                                <p className='text-lg font-medium'>{userProfile.referralCode}</p>
                            ) : (
                            <Input 
                                    value={newCode}
                                    onChange={(e) => setNewCode(e.target.value)}
                                    placeholder="crie-seu-codigo" 
                                    disabled={isCreating}
                            />
                            )}
                            
                        </div>
                        {!userProfile.referralCode && (
                            <Button className="create-code-button" onClick={handleCreateCode} disabled={isCreating}>
                                {isCreating ? 'Criando...' : 'Criar Código'}
                            </Button>
                        )}
                    </div>
                    <div className={cn("referral-link-box", !userProfile.referralCode && "opacity-50")}>
                        <p>{referralLink}</p>
                        <button onClick={handleCopyToClipboard} disabled={!userProfile.referralCode}>
                            <Upload size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
