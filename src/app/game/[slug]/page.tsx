'use client';
import { useParams } from 'next/navigation';
import { scratchCardsData } from '@/lib/scratch-card-data';
import Image from 'next/image';
import { WinnersTicker } from '@/components/WinnersTicker';
import '../game.css';
import { Film, Repeat, Zap } from 'lucide-react';
import { PrizeMarquee } from '@/components/PrizeMarquee';

export default function GamePage() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : '';

    const game = scratchCardsData.find(card => card.slug === slug);

    if (!game) {
        return <div className="text-center p-8">Jogo não encontrado.</div>;
    }

    return (
        <div className='bg-background'>
            <WinnersTicker />
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
                    
                    {/* Banner */}
                    <div className="lg:col-span-2">
                        <Image
                            src={game.bannerUrl}
                            alt={`Banner for ${game.title}`}
                            width={800}
                            height={250}
                            className="game-banner"
                        />
                    </div>

                    {/* Game Interface (Right Column on Desktop) */}
                    <div className="lg:row-span-2">
                        <div className="game-interface min-w-0 md:min-w-[380px]">
                            <div className="scratch-area-container">
                                <p className="text-sm text-white/70 flex items-center justify-center gap-2"><Zap size={14}/> Clique em "comprar e raspar" para iniciar o jogo</p>
                                <div className="my-6">
                                    <Film size={48} className="text-white/80" />
                                </div>
                                <p className="text-center text-white font-medium">Comprar por {game.price}</p>
                                <button className="buy-button-main">
                                    <span className="opacity-80">Comprar</span> {game.price}
                                </button>
                                <p className="text-center text-sm text-white/70 mt-2 px-4">
                                    Raspe os 9 quadradinhos, encontre 3 símbolos iguais e ganhe o prêmio!
                                </p>
                            </div>
                            <div className="game-controls">
                                <button className="control-button">
                                    <span className="opacity-80">Comprar</span> {game.price}
                                </button>
                                <button className="control-button icon-button"><Zap size={20} /></button>
                                <button className="control-button">
                                    <Repeat size={20} className="mr-2"/> Rodadas Automática
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Winnings Table (Below Banner on Desktop) */}
                    <div className="lg:col-span-2">
                        <div className="winnings-table-container">
                            <h2 className="winnings-title">Últimos Ganhos</h2>
                            <table className="winnings-table">
                                <thead>
                                    <tr>
                                        <th>Valor</th>
                                        <th>Ação</th>
                                        <th>Jogo</th>
                                        <th>Data/Hora</th>
                                        <th>ID Rodada</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td colSpan={6} className='text-center py-8'>Nenhum ganho recente.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                 <PrizeMarquee />
            </div>
        </div>
    );
}
