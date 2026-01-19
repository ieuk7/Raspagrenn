'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './prizes.css';
import { type Prize } from '@/lib/prizes';

const prizeData = [
    {
        name: 'Iphone 17 Pro Max',
        price: 'R$ 16.000,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20Pro%20Max%20-%2016.000.png?updatedAt=1764428859705'
    },
    {
        name: 'Ipad Pro',
        price: 'R$ 15.000,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Ipad%20Pro%20-%2015.000.png?updatedAt=1764428859458'
    },
    {
        name: 'Iphone Air',
        price: 'R$ 11.000,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%20Air%20-%2011.000.png?updatedAt=1764428858545'
    },
    {
        name: 'Iphone 17',
        price: 'R$ 10.000,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20-%2010.000.png?updatedAt=1764428859055'
    },
    {
        name: 'Apple Watch SE 3',
        price: 'R$ 3.000,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Apple%20Watch%20SE%203%20-%203.000.png?updatedAt=1764428858162'
    },
    {
        name: 'Air Pods Pro 3',
        price: 'R$ 2.500,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Air%20pods%20Pro%203%20-%202.500.png?updatedAt=1764428857342'
    },
    {
        name: 'Cabo USB tipo C',
        price: 'R$ 360,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Cabo%20de%20Carregador%20%205,00.webp?updatedAt=1764425737368'
    },
    {
        name: 'Adaptador de entrada',
        price: 'R$ 220,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Adaptador%20de%20energi%20(220.00%20).webp?updatedAt=1764425736598'
    },
    {
        name: '100 Reais',
        price: 'R$ 100,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687'
    },
    {
        name: '50 Reais',
        price: 'R$ 50,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226'
    },
    {
        name: '20 Reais',
        price: 'R$ 20,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226'
    },
    {
        name: '15 Reais',
        price: 'R$ 15,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/15%20reais.webp?updatedAt=1764425737367'
    },
    {
        name: '10 Reais',
        price: 'R$ 10,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251'
    },
    {
        name: '5 Reais',
        price: 'R$ 5,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766'
    },
    {
        name: '3 Reais',
        price: 'R$ 3,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/3%20reais.webp?updatedAt=1764425737290'
    },
    {
        name: '2 Reais',
        price: 'R$ 2,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700'
    },
    {
        name: '1 Real',
        price: 'R$ 1,00',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1%20real.webp?updatedAt=1764425737592'
    },
    {
        name: '0,50 centavos',
        price: 'R$ 0,50',
        imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/360_F_910248111_ln6nauokwOshM2slehpnWLG2y6UI5vNR-removebg-preview.png?updatedAt=1764430170299'
    }
];


export function PrizeMarquee({ prizes }: { prizes?: Prize[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const getNumericValue = (priceString: string): number => {
        // Removes 'R$ ', thousand separators '.', and replaces ',' with '.' for parsing
        return parseFloat(priceString.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
    };

    const marqueeData = prizes
    ? [...prizes].sort((a, b) => b.value - a.value).map(p => ({
        name: p.name,
        price: `R$ ${p.value.toFixed(2).replace('.', ',')}`,
        imageUrl: p.imageUrl
      }))
    : [...prizeData].sort((a, b) => getNumericValue(b.price) - getNumericValue(a.price));

    const doubledPrizes = [...marqueeData, ...marqueeData];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

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
    }, [isPaused]);

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
