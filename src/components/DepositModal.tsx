'use client';
import { useState } from 'react';
import './deposit.css';
import { DialogClose } from '@/components/ui/dialog';

export function DepositModal() {
    const [amount, setAmount] = useState('10,00');

    function selectAmount(value: string) {
        setAmount(value);
    }

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (value === "") {
            setAmount("");
            return;
        }
        const numValue = parseInt(value, 10) / 100;
        
        // Format to Brazilian currency string
        const formatted = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
        }).format(numValue);
        
        setAmount(formatted);
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

                <label className="input-label-deposit">Valor:</label>
                <div className="input-wrapper-deposit">
                    <span className="currency-symbol-deposit">R$</span>
                    <input type="text" id="amount-input" className="amount-input-deposit" value={amount} onChange={handleAmountChange}/>
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

                <button className="submit-btn-deposit">
                    <svg className="icon-svg-deposit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    Gerar QR Code
                </button>
            </div>
        </div>
    );
}
