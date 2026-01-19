'use client';
import {
    Gift,
    Smartphone,
    Gamepad2,
    Headphones,
    Wallet,
    Briefcase,
    Bike,
    Shirt,
    Sparkles,
    Tv2
  } from 'lucide-react';
import { prizePools, Prize } from '@/lib/prizes';
import { useMemo } from 'react';

// Flatten all prize pools into a single array of prizes
const allPrizes = Object.values(prizePools).flat();

// A list of fake names to use for winners
const fakeWinnerNames = [
    'Filipe Ga****',
    'Lara Va******',
    'Elizabeth Ma******',
    'Gilberto Pa**',
    'Evandro Ro*******',
    'Ian da*****',
    'Maria So****',
    'João Pe******',
    'Ana Co****',
    'Luiz Fe*******',
    'Mariana Al****',
    'Carlos Ed*****',
    'Sofia Ri******',
    'Pedro He******'
];

// Helper to select a random item from an array
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Function to get an icon based on prize name
const getIconForPrize = (prizeName: string): JSX.Element => {
    const lowerCaseName = prizeName.toLowerCase();
    if (lowerCaseName.includes('iphone') || lowerCaseName.includes('smartphone') || lowerCaseName.includes('motorola') || lowerCaseName.includes('ipad') || lowerCaseName.includes('smartwatch')) {
      return <Smartphone />;
    }
    if (lowerCaseName.includes('moto')) {
      return <Bike />;
    }
    if (lowerCaseName.includes('bolsa') || lowerCaseName.includes('mala')) {
      return <Briefcase />;
    }
    if (lowerCaseName.includes('playstation') || lowerCaseName.includes('controle')) {
      return <Gamepad2 />;
    }
    if (lowerCaseName.includes('fone') || lowerCaseName.includes('airpods') || lowerCaseName.includes('caixa de som')) {
      return <Headphones />;
    }
    if (lowerCaseName.includes('camisa')) {
      return <Shirt />;
    }
    if (lowerCaseName.includes('tv')) {
        return <Tv2 />;
    }
    if (lowerCaseName.includes('reais') || lowerCaseName.includes('centavos')) {
      return <Wallet />;
    }
    // Default for beauty, accessories, and others
    if (['perfume', 'pincel', 'maquiagem', 'secador', 'copo', 'powerbank', 'chinelo', 'relógio', 'air fryer', 'bola'].some(term => lowerCaseName.includes(term))) {
        return <Sparkles />;
    }
    return <Gift />;
};


// Generate a list of recent winners
const generateWinners = (count: number, prizes: Prize[], names: string[]): any[] => {
    const winners = [];
    // Only pick from prizes with value > 20 to make it look more impressive
    const interestingPrizes = prizes.filter(p => p.value >= 20);
    if (interestingPrizes.length === 0) return []; // Avoid errors if no prizes match

    for (let i = 0; i < count; i++) {
        const prize = getRandomItem(interestingPrizes);
        const name = getRandomItem(names);

        winners.push({
            name: name,
            prize: prize.name,
            value: `R$ ${prize.value.toFixed(2).replace('.', ',')}`,
            icon: getIconForPrize(prize.name),
        });
    }
    return winners;
};
  
export function WinnersTicker() {
    // useMemo to generate winners only once per render
    const winners = useMemo(() => generateWinners(10, allPrizes, fakeWinnerNames), []);
    // Duplica os vencedores para o efeito de rolagem infinita
    const doubledWinners = [...winners, ...winners];

    if (winners.length === 0) {
        return null; // Don't render if there's no data to show
    }

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
