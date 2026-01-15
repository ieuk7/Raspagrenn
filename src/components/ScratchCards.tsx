'use client';

import Image from 'next/image';
import { ChevronRight, Flame } from 'lucide-react';
import Link from 'next/link';

const scratchCardsData = [
  {
    title: 'Especial Raspagreen',
    subtitle: 'PRÊMIOS DE ATÉ R$ 16.000,00',
    description: 'Raspe, jogue e transforme sorte em grana real',
    price: 'R$ 1,00',
    imageUrl: 'https://influ-danc.b-cdn.net/IMG_4632.PNG',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    title: 'Seu Iphone 17 chegou',
    subtitle: 'PRÊMIOS DE ATÉ R$ 16.000,00',
    description:
      'Com apenas R$2, o iPhone lançamento pode ser seu! Ache 3 iguais e ganhe na hora. Simples...',
    price: 'R$ 2,00',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/PNG%20-%20IPHONE%2017.1.png?updatedAt=1764426491233',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    title: 'Troco Premiado',
    subtitle: 'PRÊMIOS DE ATÉ R$ 1.000,00',
    description: 'Uma moedinha pode valer mil no PIX. Vai ficar de fora?',
    price: 'R$ 0,50',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/troco%20premiado.png?updatedAt=1764426715376',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    title: 'Tech Mania',
    subtitle: 'PRÊMIOS DE ATÉ R$ 4.500,00',
    description: 'Raspou, ganhou, sacou!',
    price: 'R$ 1,00',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/Tech%20Mania.png?updatedAt=1764426715331',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    title: 'Apple Mania',
    subtitle: 'PRÊMIOS DE ATÉ R$ 5.000,00',
    description: 'Seu bilhete para prêmios de verdade.',
    price: 'R$ 2,50',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/apple%20mania.png?updatedAt=1764426715111',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    title: 'Beleza Premiada',
    subtitle: 'PRÊMIOS DE ATÉ R$ 5.000,00',
    description:
      'Apenas R$3 e você já pode conquistar perfumes, maquiagens e kits exclusivos. É só achar 3 iguais — rápido e fácil!',
    price: 'R$ 3,00',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/beleza%20premiada.png?updatedAt=1764426715458',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
];

const PrizeIcon = () => (
  <svg
    className="icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 6H16.55C16.85 5.37 17 4.7 17 4C17 2.34 15.66 1 14 1C12.96 1 12.06 1.55 11.55 2.4C11.36 2.7 10.93 3.39 10.93 3.39L12 4C12 4 12.28 3.52 12.42 3.28C12.7 2.82 13.3 2.5 14 2.5C14.83 2.5 15.5 3.17 15.5 4C15.5 4.83 14.83 5.5 14 5.5H12V4H20V6ZM4 6H12V5.5H10C9.17 5.5 8.5 4.83 8.5 4C8.5 3.17 9.17 2.5 10 2.5C10.7 2.5 11.3 2.82 11.58 3.28L13.07 3.39C13.07 3.39 12.64 2.7 12.45 2.4C11.94 1.55 11.04 1 10 1C8.34 1 7 2.34 7 4C7 4.7 7.15 5.37 7.45 6H4C2.9 6 2 6.9 2 8V10H22V8C22 6.9 21.1 6 20 6ZM20 12H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12ZM13 20H11V12H13V20Z" />
  </svg>
);

const CoinIcon = () => (
  <svg
    className="icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V8C9.9 8.2 9 9.1 9 10.25V13.75C9 14.9 9.9 15.8 11 16V17H12.5V16C13.6 15.8 14.5 14.9 14.5 13.75V10.25C14.5 9.1 13.6 8.2 12.5 8V7Z" />
  </svg>
);

function ScratchCard({ card }: { card: (typeof scratchCardsData)[0] }) {
  return (
    <div
      className="flex w-full max-w-[360px] flex-col overflow-hidden rounded-2xl border border-zinc-700 shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to top, ${card.gradientFrom}, #1a1b1a 45%)`,
      }}
    >
      <div className="relative h-40 w-full flex-shrink-0">
        <Image
          src={card.imageUrl}
          alt={`Banner ${card.title}`}
          fill={true}
          style={{objectFit: 'cover'}}
        />
      </div>

      <div className="flex flex-grow flex-col p-4 text-white">
        <h2 className="mb-1 text-lg font-bold text-white">{card.title}</h2>
        <div className="mb-3 text-xs font-semibold uppercase text-[#ffb800]">
          {card.subtitle}
        </div>
        <p className="mb-5 flex-grow text-sm leading-snug text-zinc-400">
          {card.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <button
            className="flex items-center rounded-lg py-1.5 pl-4 pr-1.5 text-black transition-colors"
            style={{ backgroundColor: card.buttonColor }}
          >
            <span className="mr-3 flex items-center gap-2 text-sm font-bold">
              <CoinIcon />
              Jogar
            </span>
            <span
              className="rounded-md px-3 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: card.priceTagColor }}
            >
              {card.price}
            </span>
          </button>
          <a
            href="#"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-white opacity-90 transition-opacity hover:opacity-100 hover:underline"
          >
            <PrizeIcon />
            VER PRÊMIOS {'>'}
          </a>
        </div>
      </div>
    </div>
  );
}

export function ScratchCards() {
  return (
    <section className="bg-background py-10" id="scratch-cards">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Flame className="text-primary animate-float" />
            Destaques
          </h2>
          <Link
            href="/raspadinhas"
            className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white"
          >
            Ver mais
            <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scratchCardsData.map((card, index) => (
            <div key={index} className="flex justify-center">
              <ScratchCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
