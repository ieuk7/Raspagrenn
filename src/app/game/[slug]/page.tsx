'use client';
import { useParams, useRouter } from 'next/navigation';
import { scratchCardsData } from '@/lib/scratch-card-data';
import Image from 'next/image';
import { WinnersTicker } from '@/components/WinnersTicker';
import '../game.css';
import { Repeat, Zap, Gift, Coins, Star, Gem, Frown, X } from 'lucide-react';
import { PrizeMarquee } from '@/components/PrizeMarquee';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Prize, prizePool, selectRandomPrize } from '@/lib/prizes';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';


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
    prize: Prize;
}

export default function GamePage() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const router = useRouter();
    const { toast } = useToast();

    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const [isGameActive, setIsGameActive] = useState(false);
    const [grid, setGrid] = useState<CellData[]>([]);
    const [gameResult, setGameResult] = useState<{prize: Prize | null, isWin: boolean} | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    // New states for Turbo and Auto-Play
    const [isTurboActive, setIsTurboActive] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [autoPlayRounds, setAutoPlayRounds] = useState(10);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [isAutoPlayDialogOpen, setIsAutoPlayDialogOpen] = useState(false);
    const [autoPlayInput, setAutoPlayInput] = useState('10');
    
    const game = scratchCardsData.find(card => card.slug === slug);
    const cardPrice = game ? parseFloat(game.price.replace('R$ ', '').replace(',', '.')) : 0;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    // --- Autoplay Effect ---
    useEffect(() => {
        if (isAutoPlay && !isGameActive && !isProcessing && roundsPlayed < autoPlayRounds) {
            const timer = setTimeout(() => {
                handleBuyAndScratch();
            }, 1000); // 1s delay between rounds
            return () => clearTimeout(timer);
        }

        if (isAutoPlay && roundsPlayed >= autoPlayRounds) {
            setIsAutoPlay(false);
            toast({ title: 'Jogo automático concluído!' });
        }
    }, [isAutoPlay, isGameActive, isProcessing, roundsPlayed, autoPlayRounds]);

    const handleBuyAndScratch = async () => {
        if (!user || !userProfile || !userDocRef) {
            toast({ variant: 'destructive', title: 'Você precisa estar logado para jogar!' });
            if (isAutoPlay) setIsAutoPlay(false);
            router.push('/login');
            return;
        }
        if (isProcessing) return;

        setIsGameFinished(false);
        setIsProcessing(true);
        if (isAutoPlay) {
            setRoundsPlayed(prev => prev + 1);
        }

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

            if (isTurboActive || isAutoPlay) {
                setTimeout(() => handleRevealAll(), 100);
            }

        } catch (e: any) {
            console.error(e);
            toast({
                variant: 'destructive',
                title: 'Erro ao comprar',
                description: typeof e === 'string' ? e : e.message,
            });
            if (isAutoPlay) {
                setIsAutoPlay(false);
            }
            setIsProcessing(false); // Reset on error to allow retry
        }
    };
    
    const setupGrid = (winningPrize: Prize | null) => {
        const newGridPrizes: Prize[] = [];
        const gridSize = 9;

        if (winningPrize) {
            for (let i = 0; i < 3; i++) {
                newGridPrizes.push(winningPrize);
            }
        }
        
        const dummyPrizes: Prize[] = [];
        const prizeCounts: {[key: string]: number} = {};
        const filteredPool = prizePool.filter(p => p.name !== winningPrize?.name);
        
        while (dummyPrizes.length < (gridSize - newGridPrizes.length)) {
             const randomIndex = Math.floor(Math.random() * filteredPool.length);
             const candidate = filteredPool[randomIndex];
             const currentCount = prizeCounts[candidate.name] || 0;

             if (currentCount < 2) {
                 dummyPrizes.push(candidate);
                 prizeCounts[candidate.name] = currentCount + 1;
             }
        }

        newGridPrizes.push(...dummyPrizes);

        for (let i = newGridPrizes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newGridPrizes[i], newGridPrizes[j]] = [newGridPrizes[j], newGridPrizes[i]];
        }
        
        setGrid(newGridPrizes.map(prize => ({ prize })));
    };

    const handleRevealAll = () => {
        if(isProcessing || !isGameActive || isGameFinished) return;
        
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
        setTimeout(() => handleGameEnd(), 500); 
    };

    const handleGameEnd = async () => {
        if (!gameResult || !userDocRef || isGameFinished) return;
        
        setIsGameFinished(true);
        
        let toastTitle = "Que pena!";
        let toastDescription = "Mais sorte na próxima vez.";

        if (gameResult.isWin && gameResult.prize) {
            const prizeValue = gameResult.prize.value;
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
        
        toast({ title: toastTitle, description: toastDescription });
        
        setTimeout(() => {
            setIsGameActive(false);
            setGameResult(null);
            setIsProcessing(false);
        }, 4000);
    };

    const handleTurboClick = () => {
        if (isGameActive && !isGameFinished) {
            handleRevealAll();
        } else if (!isGameActive) {
            setIsTurboActive(!isTurboActive);
        }
    };

    const handleAutoPlayToggle = () => {
        if (isAutoPlay) {
            setIsAutoPlay(false);
            setRoundsPlayed(0);
            toast({ title: 'Jogo automático parado.' });
        } else {
            setIsAutoPlayDialogOpen(true);
        }
    };
    
    const handleStartAutoPlay = () => {
        const rounds = parseInt(autoPlayInput, 10);
        if (rounds > 0 && rounds <= 100) { // Add a reasonable limit
            setAutoPlayRounds(rounds);
            setRoundsPlayed(0);
            setIsAutoPlay(true);
            setIsAutoPlayDialogOpen(false);
        } else {
            toast({ variant: 'destructive', title: 'Número de rodadas inválido.', description: 'Por favor, insira um número entre 1 e 100.' });
        }
    };

    useEffect(() => {
        if (!isGameActive || !canvasRef.current || !gameAreaRef.current) return;

        const canvas = canvasRef.current;
        const gameArea = gameAreaRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let isDrawing = false;
        
        const initScratchCard = () => {
            canvas.width = gameArea.offsetWidth;
            canvas.height = gameArea.offsetHeight;

            let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#999');
            gradient.addColorStop(0.5, '#bbb');
            gradient.addColorStop(1, '#999');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#666";
            ctx.font = "bold 30px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("RASPE AQUI", canvas.width/2, canvas.height/2);

            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 40;

            function scratch(x: number, y: number) {
                if(!ctx) return;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            function checkScratchCompletion() {
                if(!ctx || !canvas) return;
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                let transparentPixels = 0;

                for (let i = 3; i < pixels.length; i += 4) {
                    if (pixels[i] < 128) {
                        transparentPixels++;
                    }
                }

                const totalPixels = pixels.length / 4;
                const percentage = (transparentPixels / totalPixels) * 100;

                if (percentage > 50) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    setTimeout(() => handleGameEnd(), 500);
                }
            }

            const getCoords = (e: MouseEvent | TouchEvent) => {
                const rect = canvas.getBoundingClientRect();
                if (e instanceof MouseEvent) {
                    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
                }
                const touch = (e as TouchEvent).touches[0];
                return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
            }

            const onStart = (e: MouseEvent | TouchEvent) => {
                isDrawing = true;
                const {x, y} = getCoords(e);
                scratch(x, y);
            }
            const onMove = (e: MouseEvent | TouchEvent) => {
                if (!isDrawing) return;
                e.preventDefault();
                const {x, y} = getCoords(e);
                scratch(x, y);
            }
            const onEnd = () => {
                if (isDrawing) {
                    isDrawing = false;
                    checkScratchCompletion();
                }
            }
            
            canvas.addEventListener('mousedown', onStart);
            canvas.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onEnd);
            canvas.addEventListener('touchstart', onStart, { passive: false });
            canvas.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onEnd);

            return () => {
                 canvas.removeEventListener('mousedown', onStart);
                 canvas.removeEventListener('mousemove', onMove);
                 window.removeEventListener('mouseup', onEnd);
                 canvas.removeEventListener('touchstart', onStart);
                 canvas.removeEventListener('touchmove', onMove);
                 window.removeEventListener('touchend', onEnd);
            }
        }
        
        const cleanup = initScratchCard();

        return cleanup;

    }, [isGameActive, grid]);
    
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
                        <div className="scratch-main-wrapper">
                            <div className="scratch-game-area" id="gameArea" ref={gameAreaRef}>
                                
                                {!isGameActive ? (
                                    <div className={cn('scratch-start-screen', isProcessing && 'opacity-50')}>
                                        <div className="scratch-top-hint"><Zap className='inline-block' size={12}/> {isProcessing ? "Gerando sua cartela..." : `Clique em "comprar" para iniciar`}</div>
                                        <div className="scratch-bg-text">RASPE AQUI!</div>
                                        <div className="scratch-central-icon-circle"><Coins size={40} /></div>
                                        <div className="scratch-instruction-top">Comprar por {game.price}</div>
                                        <button className="scratch-btn-buy" onClick={handleBuyAndScratch} disabled={isProcessing || isUserLoading || isProfileLoading || isAutoPlay}>
                                            <Coins className="scratch-btn-icon" size={16} />
                                            <span className="scratch-btn-text">Comprar</span>
                                            <span className="scratch-price-tag">{game.price}</span>
                                        </button>
                                        <p className="scratch-instruction-bottom" dangerouslySetInnerHTML={{ __html: 'Raspe os 9 quadradinhos, <strong>encontre<br>3 símbolos iguais e ganhe o prêmio!</strong>' }} />
                                    </div>
                                ) : (
                                    <div className="scratch-game-play-screen">
                                        <div className="scratch-prize-grid">
                                            {grid.map((cell, index) => (
                                                <div key={index} className="scratch-grid-item">
                                                     <Image src={cell.prize.imageUrl} alt={cell.prize.name} width={25} height={25} style={{objectFit: 'contain'}}/>
                                                     R$ {cell.prize.value.toFixed(2).replace('.', ',')}
                                                </div>
                                            ))}
                                        </div>
                                        <canvas id="scratchCanvas" ref={canvasRef} className={cn(isGameFinished && 'opacity-0')}></canvas>
                                        {isGameFinished && gameResult && (
                                            <div className="scratch-result-overlay">
                                                {gameResult.isWin && gameResult.prize ? (
                                                    <>
                                                        <h3 className="scratch-result-title">Parabéns!</h3>
                                                        <p className="scratch-result-prize">Você ganhou R$ {gameResult.prize.value.toFixed(2).replace('.', ',')}</p>
                                                        <p className="scratch-result-message">O valor foi adicionado ao seu saldo.</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="scratch-result-title">Que pena!</h3>
                                                        <p className="scratch-result-message">Não foi dessa vez. Tente novamente!</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="scratch-controls-bar">
                                <button className="scratch-btn-buy" onClick={handleBuyAndScratch} disabled={isAutoPlay || isProcessing || isGameActive || isUserLoading || isProfileLoading}>
                                    <Coins className="scratch-btn-icon" size={16}/>
                                    <span className="scratch-btn-text">Comprar</span>
                                    <span className="scratch-price-tag">{game.price}</span>
                                </button>
                                <button
                                    className={cn("scratch-btn-turbo", isTurboActive && !isGameActive && "turbo-active")}
                                    onClick={handleTurboClick}
                                    disabled={isAutoPlay || isProcessing || (isGameActive && isGameFinished)}
                                >
                                    <Zap />
                                </button>
                                <button
                                    className="scratch-btn-auto"
                                    disabled={!isAutoPlay && (isGameActive || isProcessing)}
                                    onClick={handleAutoPlayToggle}
                                >
                                    {isAutoPlay ? (
                                        <>
                                            <X className="mr-2" /> Parar ({roundsPlayed}/{autoPlayRounds})
                                        </>
                                    ) : (
                                        <>
                                            <Repeat className="mr-2" /> Auto
                                        </>
                                    )}
                                </button>
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

            <Dialog open={isAutoPlayDialogOpen} onOpenChange={setIsAutoPlayDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Jogo Automático</DialogTitle>
                    <DialogDescription>
                        Defina quantas rodadas você quer jogar. O jogo irá parar se o seu saldo acabar ou você clicar em parar.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rounds" className="text-right">
                        Rodadas
                        </Label>
                        <Input
                        id="rounds"
                        value={autoPlayInput}
                        onChange={(e) => setAutoPlayInput(e.target.value)}
                        type="number"
                        className="col-span-3"
                        placeholder="Ex: 10"
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button onClick={handleStartAutoPlay}>Iniciar Jogo Automático</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}

    