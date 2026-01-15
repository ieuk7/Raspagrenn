'use client';
import {
    Car,
    Gift,
    Smartphone,
    Gamepad2,
    Headphones,
    Ticket,
    Wallet,
    Briefcase,
  } from 'lucide-react';
  
  const winners = [
    {
      name: 'Filipe Ga****',
      prize: 'Air Pods Pro 3',
      value: 'R$ 2.500,00',
      icon: <Headphones />,
    },
    {
      name: 'Lara Va******',
      prize: 'GoPro Hero',
      value: 'R$ 2.500,00',
      icon: <Gamepad2 />,
    },
    {
      name: 'Elizabeth Ma******',
      prize: '0,50 Centavos',
      value: 'R$ 0,50',
      icon: <Wallet />,
    },
    {
      name: 'Gilberto Pa**',
      prize: 'Mala Rimowa',
      value: 'R$ 10.000,00',
      icon: <Briefcase />,
    },
    {
      name: 'Evandro Ro*******',
      prize: '500000 Reais',
      value: 'R$ 50.000,00',
      icon: <Ticket />,
    },
    {
      name: 'Ian da*****',
      prize: 'Controle Xbox',
      value: 'R$ 700,00',
      icon: <Gamepad2 />,
    },
  ];
  
  // Duplica os vencedores para o efeito de rolagem infinita
  const doubledWinners = [...winners, ...winners];
  
  export function WinnersTicker() {
    return (
      <div className="live-bar-container">
        <div className="live-indicator">
          <span className="text-ao">AO</span>
          <span className="text-vivo">VIVO</span>
          <div className="live-dot"></div>
        </div>
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {doubledWinners.map((winner, index) => (
              <div className="winner-card" key={index}>
                <div className="prize-icon">{winner.icon}</div>
                <div className="card-info">
                  <span className="winner-name">{winner.name}</span>
                  <span className="prize-name">{winner.prize}</span>
                  <span className="prize-value">{winner.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  