'use client';
import { useParams, useRouter } from 'next/navigation';
import { scratchCardsData } from '@/lib/scratch-card-data';
import Image from 'next/image';
import { WinnersTicker } from '@/components/WinnersTicker';
import '../game.css';
import { Repeat, Zap, Gift } from 'lucide-react';
import { PrizeMarquee } from '@/components/PrizeMarquee';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Prize, prizePool, selectRandomPrize, getDummyPrizes } from '@/lib/prizes';
import { cn } from '@/lib/utils';


interface UserProfile {
    id: string;
    email: string;
    username: string;
    phone?: string;
    document?: string;
    balance?: number;
    win_percentage?: number;
}

interface CellData {
    prize: Prize | null;
    isRevealed: boolean;
}

export default function GamePage() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const router = useRouter();
    const { toast } = useToast();

    // Firebase hooks
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    // Game state
    const [isGameActive, setIsGameActive] = useState(false);
    const [grid, setGrid] = useState<CellData[]>([]);
    const [gameResult, setGameResult] = useState<{prize: Prize | null, isWin: boolean} | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('Clique em "comprar e raspar" para iniciar o jogo');
    
    const game = scratchCardsData.find(card => card.slug === slug);
    const cardPrice = game ? parseFloat(game.price.replace('R$ ', '').replace(',', '.')) : 0;

    // Fetch user profile
    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    const handleBuyAndScratch = async () => {
        if (!user || !userProfile || !userDocRef) {
            toast({ variant: 'destructive', title: 'Você precisa estar logado para jogar!' });
            router.push('/login');
            return;
        }
        if (isProcessing) return;

        setIsProcessing(true);
        setMessage("Gerando sua cartela...");

        try {
            const finalPrize = await runTransaction(firestore, async (transaction) => {
                const userDoc = await transaction.get(userDocRef);
                if (!userDoc.exists()) {
                    throw "Usuário não encontrado.";
                }

                const currentBalance = userDoc.data().balance ?? 0;
                if (currentBalance < cardPrice) {
                    throw "Saldo insuficiente.";
                }

                transaction.update(userDocRef, { balance: currentBalance - cardPrice });

                const winPercentage = userDoc.data().win_percentage ?? 50;
                const prizeWon = selectRandomPrize(winPercentage);

                return prizeWon;
            });
            
            setupGrid(finalPrize);
            setGameResult({ prize: finalPrize, isWin: !!finalPrize });
            setIsGameActive(true);
            setMessage("Raspe e encontre 3 símbolos iguais!");

        } catch (e: any) {
            console.error(e);
            toast({
                variant: 'destructive',
                title: 'Erro ao comprar',
                description: typeof e === 'string' ? e : e.message,
            });
            setMessage('Clique em "comprar e raspar" para iniciar o jogo');
        } finally {
            setIsProcessing(false);
        }
    };
    
    const setupGrid = (winningPrize: Prize | null) => {
        const newGrid: CellData[] = Array(6).fill(null).map(() => ({ prize: null, isRevealed: false }));

        if (winningPrize) {
            const winningPrizeWithImage = prizePool.find(p => p.name === winningPrize.name)!;
            let count = 0;
            while (count < 3) {
                const index = Math.floor(Math.random() * 6);
                if (newGrid[index].prize === null) {
                    newGrid[index].prize = winningPrizeWithImage;
                    count++;
                }
            }
        }
        
        const dummyPrizes = getDummyPrizes(6, winningPrize || prizePool[0]);
        let dummyIndex = 0;
        for (let i = 0; i < 6; i++) {
            if (newGrid[i].prize === null) {
                let dummy;
                do {
                  dummy = dummyPrizes[dummyIndex++ % dummyPrizes.length];
                } while (newGrid.filter(c => c.prize?.name === dummy.name).length >= 2);
                newGrid[i].prize = dummy;
            }
        }

        for (let i = newGrid.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newGrid[i], newGrid[j]] = [newGrid[j], newGrid[i]];
        }
        
        setGrid(newGrid.map(cell => ({ ...cell, isRevealed: false })));
    };

    const handleRevealCell = (index: number) => {
        if (isProcessing || !isGameActive || grid[index].isRevealed) return;
        
        const newGrid = [...grid];
        newGrid[index].isRevealed = true;
        setGrid(newGrid);

        const revealedCount = newGrid.filter(c => c.isRevealed).length;
        if (revealedCount === 6) {
            handleGameEnd();
        }
    };
    
    const handleRevealAll = () => {
        if(isProcessing || !isGameActive) return;
        setGrid(grid.map(cell => ({ ...cell, isRevealed: true })));
        setTimeout(handleGameEnd, 100); 
    };

    const handleGameEnd = async () => {
        if (!gameResult || !userDocRef || isProcessing) return;
        
        setIsProcessing(true);
        let finalMessage = "Não foi dessa vez! Tente novamente.";
        let toastTitle = "Que pena!";
        let toastDescription = "Mais sorte na próxima vez.";

        if (gameResult.isWin && gameResult.prize) {
            const prizeValue = gameResult.prize.value;
            finalMessage = `Você ganhou R$ ${prizeValue.toFixed(2).replace('.',',')}!`;
            toastTitle = "Parabéns!";
            toastDescription = `Você ganhou R$ ${prizeValue.toFixed(2).replace('.',',')}`;

            try {
                await runTransaction(firestore, async (transaction) => {
                    const userDoc = await transaction.get(userDocRef);
                    if (!userDoc.exists()) throw "Usuário não encontrado.";
                    const currentBalance = userDoc.data().balance ?? 0;
                    transaction.update(userDocRef, { balance: currentBalance + prizeValue });
                });
            } catch (e: any) {
                toast({ variant: 'destructive', title: 'Erro ao creditar prêmio', description: e.message });
            }
        }
        
        setMessage(finalMessage);
        toast({ title: toastTitle, description: toastDescription });
        
        setTimeout(() => {
            setIsGameActive(false);
            setGameResult(null);
            setMessage('Clique em "comprar e raspar" para iniciar o jogo');
            setIsProcessing(false);
        }, 4000);
    };
    
    if (!game) {
        return <div className="text-center p-8">Jogo não encontrado.</div>;
    }

    return (
        <div className='bg-background'>
            <WinnersTicker />
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
                    
                    <div className="lg:col-span-2">
                        <Image
                            src={game.bannerUrl}
                            alt={`Banner for ${game.title}`}
                            width={800}
                            height={250}
                            className="game-banner"
                        />
                    </div>

                    <div className="lg:row-span-2">
                        <div className="game-interface min-w-0 md:min-w-[380px]">
                             <div className={cn("scratch-area-container", isGameActive && "active")}>
                                {isGameActive ? (
                                     <>
                                        <p className="text-sm text-white/70 h-5 mb-4">{message}</p>
                                        <div className="scratch-grid my-2 grid-cols-3 grid-rows-2">
                                            {grid.map((cell, index) => (
                                                <div key={index} className={cn("scratch-cell", cell.isRevealed && "revealed")} onClick={() => handleRevealCell(index)}>
                                                    {cell.isRevealed && cell.prize && (
                                                        <Image src={cell.prize.imageUrl} alt={cell.prize.name} width={40} height={40} className="prize-image" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-center text-white/70 text-xs h-4 mt-2">
                                             {grid.filter(c => c.isRevealed).length === 6 ? "Jogo finalizado!" : ""}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-white/70 flex items-center justify-center gap-2"><Zap size={14}/> {message}</p>
                                        <div className="my-6">
                                            <Gift size={48} className="text-white/80" />
                                        </div>
                                        <p className="text-center text-white font-medium">Comprar por {game.price}</p>
                                    </>
                                )}
                            </div>

                            <div className="game-controls">
                                 {!isGameActive ? (
                                    <button className="control-button w-full" onClick={handleBuyAndScratch} disabled={isProcessing || isUserLoading || isProfileLoading}>
                                        {isProcessing ? "Processando..." : `Comprar e Raspar ${game.price}`}
                                    </button>
                                ) : (
                                    <button className="control-button w-full" onClick={handleRevealAll} disabled={isProcessing}>
                                        <Zap size={20} className="mr-2"/> Revelar Tudo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-8">
                        <PrizeMarquee />
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
            </div>
        </div>
    );
}
