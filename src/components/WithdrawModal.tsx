'use client';
import { useState, useEffect, useRef } from 'react';
import './withdraw.css';
import { DialogClose } from '@/components/ui/dialog';

type PixType = 'phone' | 'email' | 'cpf' | 'cnpj' | 'random';

const pixOptions: {
    type: PixType;
    label: string;
    placeholder: string;
    icon: JSX.Element;
}[] = [
    {
        type: 'phone',
        label: 'Telefone',
        placeholder: 'Digite seu Telefone...',
        icon: <svg className="icon-small-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    },
    {
        type: 'email',
        label: 'Email',
        placeholder: 'Digite seu Email...',
        icon: <svg className="icon-small-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    },
    {
        type: 'cpf',
        label: 'CPF',
        placeholder: 'Digite seu CPF...',
        icon: <svg className="icon-small-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><line x1="15" y1="8" x2="17" y2="8"></line><line x1="15" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>
    },
    {
        type: 'cnpj',
        label: 'CNPJ',
        placeholder: 'Digite seu CNPJ...',
        icon: <svg className="icon-small-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    },
    {
        type: 'random',
        label: 'Chave aleatória',
        placeholder: 'Digite sua Chave aleatória...',
        icon: <svg className="icon-small-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"></path></svg>
    }
];


export function WithdrawModal() {
    const [amount, setAmount] = useState('20,00');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPixType, setSelectedPixType] = useState<PixType>('random');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (!value) {
            setAmount("");
            return;
        }
        const numValue = parseInt(value, 10) / 100;
        const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(numValue);
        setAmount(formatted);
    };

    const handleSelectPixType = (type: PixType) => {
        setSelectedPixType(type);
        setIsDropdownOpen(false);
    };

    const currentPixOption = pixOptions.find(opt => opt.type === selectedPixType);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (dropdownRef.current && !dropdownRef.current.contains(target) && !target.closest('.pix-type-selector-withdraw')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal-container-withdraw">
            <DialogClose asChild>
                <button className="close-btn-withdraw">&times;</button>
            </DialogClose>

            <div className="banner-container-withdraw">
                <img src="https://raspagreen.com/assets/withdraw-D8GQJ4xo.webp" alt="Banner Saque" className="banner-img-withdraw" />
            </div>

            <div className="modal-content-withdraw">
                <div className="modal-title-withdraw">
                    <svg className="icon-svg-withdraw" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M12 12h.01"></path>
                        <path d="M12 8v-2"></path>
                        <path d="M12 16v2"></path>
                    </svg>
                    Sacar
                </div>

                <label className="input-label-withdraw">Valor:</label>
                <div className="input-wrapper-withdraw">
                    <span className="currency-symbol-withdraw">R$</span>
                    <input type="text" className="amount-input-withdraw" value={amount} onChange={handleAmountChange} />
                </div>

                <div className="amount-grid-withdraw">
                    <button className="amount-btn-withdraw" onClick={() => setAmount('30,00')}>R$ 30,00</button>
                    <button className="amount-btn-withdraw" onClick={() => setAmount('50,00')}>R$ 50,00</button>
                    <button className="amount-btn-withdraw" onClick={() => setAmount('100,00')}>R$ 100,00</button>
                    <button className="amount-btn-withdraw" onClick={() => setAmount('200,00')}>R$ 200,00</button>
                </div>

                <label className="input-label-withdraw">Chave PIX</label>
                <div className="pix-group-withdraw" ref={dropdownRef}>
                    <div className="pix-type-selector-withdraw" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div id="current-pix-icon">
                            {currentPixOption?.icon}
                        </div>
                        <svg className="icon-small-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px' }}>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>

                    <input type="text" className="pix-input-withdraw" placeholder={currentPixOption?.placeholder} />

                    {isDropdownOpen && (
                        <div className="pix-dropdown-withdraw show">
                            {pixOptions.map(option => (
                                <div
                                    key={option.type}
                                    className={`pix-option-withdraw ${selectedPixType === option.type ? 'selected' : ''}`}
                                    onClick={() => handleSelectPixType(option.type)}
                                >
                                    {option.icon}
                                    {option.label}
                                    <svg className="check-icon-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className="submit-btn-withdraw">
                    <svg className="icon-svg-withdraw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <line x1="12" y1="12" x2="12" y2="12"></line>
                        <path d="M12 8v-3m0 14v-3"></path>
                    </svg>
                    Solicitar Saque
                </button>
            </div>
        </div>
    );
}
