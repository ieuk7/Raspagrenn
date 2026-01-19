'use client';

import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useToast } from '@/hooks/use-toast';
import { checkPixStatus } from '@/app/actions/pix';
import { doc, runTransaction, getDoc, increment } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import './pix-payment-modal.css';
import { Copy, CheckCircle, AlertTriangle, X } from 'lucide-react';

export interface PixData {
    hash: string;
    pix: {
        pix_qr_code: string;
        expiration_date: string;
    };
    amount_paid: number;
}

interface UserProfile {
    referredBy?: string;
}

interface PixQRCodeModalProps {
  pixData: PixData;
  onClose: () => void;
}

export function PixPaymentModal({ pixData, onClose }: PixQRCodeModalProps) {
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();
    const [status, setStatus] = useState<'pending' | 'paid' | 'error'>('pending');

    const amount = pixData.amount_paid / 100;
    const formattedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
    
    // Hardcoded expiration from PHP file
    const expirationDate = new Date(Date.now() + 5 * 60 * 1000);
    const formattedExpiration = expirationDate.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).replace(',', '');


    useEffect(() => {
        if (status !== 'pending' || !user) return;

        const userDocRef = doc(firestore, 'users', user.uid);
        const interval = setInterval(async () => {
            try {
                const result = await checkPixStatus(pixData.hash);
                if (result.payment_status === 'paid') {
                    setStatus('paid');
                    clearInterval(interval);

                    // Transaction to credit the depositor's balance
                    await runTransaction(firestore, async (transaction) => {
                        const userDoc = await transaction.get(userDocRef);
                        if (!userDoc.exists()) throw "User not found.";
                        transaction.update(userDocRef, { balance: increment(amount) });
                    });

                    toast({ title: 'Pagamento aprovado!', description: `O valor de ${formattedAmount} foi adicionado ao seu saldo.` });
                    
                    // After crediting the user, check for a referrer and pay commission
                    const userDocSnapshot = await getDoc(userDocRef);
                    const userData = userDocSnapshot.data() as UserProfile;

                    if (userData.referredBy) {
                        const referrerRef = doc(firestore, 'users', userData.referredBy);
                        const commissionAmount = amount * 0.50; // 50% commission

                        // Transaction to pay the referrer
                        await runTransaction(firestore, async (transaction) => {
                            transaction.update(referrerRef, {
                                balance: increment(commissionAmount),
                                totalCommission: increment(commissionAmount)
                            });
                        });
                         toast({ title: 'Comissão Paga!', description: `Uma comissão foi enviada para quem te indicou.` });
                    }

                    // Keep success message for a bit before closing
                    setTimeout(onClose, 4000); 
                }
            } catch (error: any) {
                console.error("Payment check/commission failed:", error);
                // Optionally set an error state here if polling fails multiple times
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, [status, pixData.hash, user, firestore, amount, formattedAmount, onClose, toast]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pixData.pix.pix_qr_code);
        toast({ title: 'Código PIX copiado!' });
    };

    if (status === 'paid') {
         return (
            <div className="pix-modal-container">
                <div className="pix-modal-content success-state">
                    <CheckCircle className="success-icon" size={64} />
                    <h3 className="pix-modal-title">Pagamento Aprovado!</h3>
                    <p className="pix-modal-description">O valor de {formattedAmount} já está na sua conta.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="pix-modal-container">
             <div className="pix-modal-content">
                <button onClick={onClose} className="pix-modal-close-btn">
                    <X size={24} />
                </button>
                
                <div className="pix-modal-header">
                    <span className="pix-modal-icon-wrapper">
                        <CheckCircle size={32} />
                    </span>
                    <h3 className="pix-modal-title">Pagamento Gerado!</h3>
                    <p className="pix-modal-expiration">Expira em: <span className="font-mono">{formattedExpiration}</span></p>
                    <p className="pix-modal-amount">{formattedAmount}</p>
                </div>

                <div className="pix-qrcode-wrapper">
                    <QRCodeCanvas value={pixData.pix.pix_qr_code} size={184} imageSettings={{
                        src: "https://i.postimg.cc/5jdp32QJ/Icone-Azul-Diamantado.png",
                        height: 30,
                        width: 30,
                        excavate: true,
                    }}/>
                </div>

                <div className="pix-modal-actions">
                    <div className="pix-code-input-wrapper">
                        <input type="text" value={pixData.pix.pix_qr_code} readOnly className="pix-code-input" onClick={(e) => (e.target as HTMLInputElement).select()} />
                        <button onClick={copyToClipboard} className="pix-code-copy-btn">
                            <Copy size={20} />
                        </button>
                    </div>
                    
                    <button onClick={copyToClipboard} className="pix-copy-main-btn">
                        <Copy size={20} />
                        <span>Copiar Código PIX</span>
                    </button>
                </div>
                <p className="pix-modal-footer-note">Ao pagar, você receberá a confirmação imediatamente neste dispositivo.</p>
            </div>
        </div>
    );
}
