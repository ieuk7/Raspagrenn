'use client';
import { prizePools, Prize } from '@/lib/prizes';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
            imageUrl: prize.imageUrl,
        });
    }
    return winners;
};
  
export function WinnersTicker() {
    const [winners, setWinners] = useState<any[]>([]);

    useEffect(() => {
        // This code runs only on the client, after the initial render.
        setWinners(generateWinners(10, allPrizes, fakeWinnerNames));
    }, []);

    // Duplica os vencedores para o efeito de rolagem infinita
    const doubledWinners = [...winners, ...winners];

    if (winners.length === 0) {
        return null; // Don't render if there's no data to show (e.g., during SSR)
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
                <div className="prize-icon">
                  <Image src={winner.imageUrl} alt={winner.prize} width={36} height={36} style={{objectFit: 'contain'}} />
                </div>
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
