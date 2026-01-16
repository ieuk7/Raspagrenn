'use client';
import { useState } from 'react';
import './deposit.css';
import { DialogClose } from '@/components/ui/dialog';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { generatePix } from '@/app/actions/pix';
import { PixPaymentModal, PixData } from './PixPaymentModal';
import { Loader2 } from 'lucide-react';

interface UserProfile {
    username?: string;
    document?: string;
    phone?: string;
}

export function DepositModal() {
    const [amount, setAmount] = useState('10,00');
    const { user } = useUser();
    const { toast } = useToast();
    const firestore = useFirestore();

    const [isLoading, setIsLoading] = useState(false);
    const [pixData, setPixData] = useState<PixData | null>(null);

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile } = useDoc<UserProfile>(userDocRef);

    function selectAmount(value: string) {
        setAmount(value);
    }

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (value === "") {
            setAmount("0,00");
            return;
        }
        const numValue = parseInt(value, 10) / 100;
        
        const formatted = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
        }).format(numValue);
        
        setAmount(formatted);
    }
    
    const handleGeneratePix = async () => {
        if (!user) {
            toast({ title: 'Você precisa estar logado para depositar.', variant: 'destructive' });
            return;
        }
        const numericAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
        if (isNaN(numericAmount) || numericAmount <= 0) {
            toast({ title: 'Valor de depósito inválido.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        try {
            const data = await generatePix(numericAmount, {
                name: userProfile?.username || user.email!,
                email: user.email!,
                document: userProfile?.document,
                phone: userProfile?.phone
            });
            setPixData(data);
        } catch (error: any) {
            toast({ title: 'Erro ao gerar PIX', description: error.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };


    if (pixData) {
        return (
            <PixPaymentModal
                pixData={pixData}
                onClose={() => setPixData(null)}
            />
        )
    }

    return (
        <div className="modal-container-deposit">
            
            <DialogClose asChild>
                <button className="close-btn-deposit">&times;</button>
            </DialogClose>

            <img src="https://raspagreen.com/deposit_bg.jpg" alt="Banner Promoção" className="banner-img-deposit" />

            <div className="modal-content-deposit">
                <div className="modal-title-deposit">
                    <svg className="icon-svg-deposit" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                        <path d="M12 2v4M12 18v4"></path> 
                    </svg>
                    Depositar
                </div>

                <label className="input-label-deposit">Valor do depósito:</label>
                <div className="input-wrapper-deposit">
                    <span className="currency-symbol-deposit">R$</span>
                    <input 
                        type="text" 
                        id="amount-input" 
                        className="amount-input-deposit" 
                        value={amount} 
                        onChange={handleAmountChange} 
                        inputMode="numeric"
                    />
                </div>

                <div className="amount-grid-deposit">
                    <button className="amount-btn-deposit" onClick={() => selectAmount('10,00')}>
                        R$ 10,00
                    </button>
                    
                    <button className="amount-btn-deposit hot-deposit" onClick={() => selectAmount('30,00')}>
                        <div className="badge-hot-deposit">
                            🔥 QUENTE
                        </div>
                        R$ 30,00
                    </button>

                    <button className="amount-btn-deposit" onClick={() => selectAmount('50,00')}>
                        R$ 50,00
                    </button>

                    <button className="amount-btn-deposit" onClick={() => selectAmount('100,00')}>
                        R$ 100,00
                    </button>
                </div>

                <button className="submit-btn-deposit" onClick={handleGeneratePix} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin icon-svg-deposit" /> : (
                        <svg className="icon-svg-deposit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    )}
                    Gerar QR Code PIX
                </button>
            </div>
        </div>
    );
}
