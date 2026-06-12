'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './prizes.css';
import { type Prize } from '@/lib/prizes';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function PrizeMarquee({ prizes }: { prizes?: Prize[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Filter and sort prizes by value descending
    const marqueeData = prizes
    ? [...prizes].sort((a, b) => b.value - a.value).map(p => ({
        name: p.name,
        price: currencyFormatter.format(p.value),
        imageUrl: p.imageUrl
      }))
    : [];

    const doubledPrizes = [...marqueeData, ...marqueeData];

    useEffect(() => {
        const track = trackRef.current;
        if (!track || marqueeData.length === 0) return;

        let position = 0;
        const speed = 0.5;
        let animationId: number;

        const getCycleWidth = () => {
            return track.scrollWidth / 2;
        };

        const animate = () => {
            if (!isPaused) {
                position -= speed;
                const cycleWidth = getCycleWidth();
                if (Math.abs(position) >= cycleWidth) {
                    position = 0;
                }
                track.style.transform = `translateX(${position}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [isPaused, marqueeData.length]);

    if (marqueeData.length === 0) return null;

    return (
        <div className='py-8'>
            <h3 className="section-title">Prêmios da Raspadinha:</h3>
            <div 
                className="marquee-container"
                ref={containerRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
            >
                <div className="marquee-track" ref={trackRef}>
                    {doubledPrizes.map((prize, index) => (
                        <div className="prize-card" key={index}>
                            <div className="card-img-container">
                                <Image src={prize.imageUrl} alt={prize.name} width={90} height={90} className="card-img" />
                            </div>
                            <div className="card-info">
                                <span className="card-name">{prize.name}</span>
                                <span className="card-price-badge">{prize.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
