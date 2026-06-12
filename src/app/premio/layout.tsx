import React from 'react';

export const metadata = {
  title: 'Raspa Green - Bônus Viral',
  description: 'Ganhe R$ 10,00 de saldo real agora!',
  openGraph: {
    title: 'Raspa Green - Bônus Viral',
    description: 'Ganhe R$ 10,00 de saldo real agora!',
    images: [
      {
        url: 'https://s3.typebotstorage.com/public/workspaces/cm50sof1200086yjtr125akew/typebots/cmqbcpqvu00000bjjs4gus99e/blocks/roch7rp4prc5n0c6q7n8dsjv?v=1781295029916',
        width: 1200,
        height: 630,
        alt: 'Especial Raspagreen Banner',
      },
    ],
  },
};

export default function PremioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
