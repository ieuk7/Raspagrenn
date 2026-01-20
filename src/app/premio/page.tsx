'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './premio.css';

export default function PremioPage() {
    const router = useRouter();
    const winnerTextRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const gridContainerRef = useRef<HTMLDivElement>(null);
    const attemptsTextRef = useRef<HTMLDivElement>(null);
    const lossModalRef = useRef<HTMLDivElement>(null);
    const startOverlayRef = useRef<HTMLDivElement>(null);
    const winModalRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const step1Ref = useRef<HTMLDivElement>(null);
    const step2Ref = useRef<HTMLDivElement>(null);
    const step3Ref = useRef<HTMLDivElement>(null);
    const verifyTextRef = useRef<HTMLParagraphElement>(null);
    const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
    const btnWhatsappRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // --- SCRIPT BARRA DE GANHADORES ---
        const winners = [
            "João S. acabou de sacar <span class='winner-highlight'>R$ 200,00</span> via PIX",
            "Maria L. ganhou <span class='winner-highlight'>R$ 1.000,00</span> de bônus",
            "Pedro H. sacou <span class='winner-highlight'>R$ 50,00</span> agora mesmo",
            "Ana C. ativou o bônus de <span class='winner-highlight'>R$ 500,00</span>",
            "Carlos E. fez um PIX de <span class='winner-highlight'>R$ 150,00</span>",
            "Fernanda M. liberou <span class='winner-highlight'>R$ 1.000,00</span> para jogar"
        ];

        function updateWinnersBar() {
            const el = winnerTextRef.current;
            if (!el) return;
            const randomWinner = winners[Math.floor(Math.random() * winners.length)];
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = ''; 
            el.innerHTML = `<i class="fas fa-check-circle" style="color:#2ee606"></i> ${randomWinner}`;
        }
        const winnerInterval = setInterval(updateWinnersBar, 4000); 
        updateWinnersBar(); 

        // --- SCRIPT DO JOGO (3 TENTATIVAS) ---
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const gridContainer = gridContainerRef.current;
        const attemptsText = attemptsTextRef.current;
        const lossModal = lossModalRef.current;
        const winModal = winModalRef.current;
        const modalContent = modalContentRef.current;
        const step1 = step1Ref.current;
        const step2 = step2Ref.current;
        const step3 = step3Ref.current;
        const verifyText = verifyTextRef.current;
        const btnWhatsapp = btnWhatsappRef.current;

        if (!canvas || !container || !gridContainer || !attemptsText || !lossModal || !winModal || !modalContent || !step1 || !step2 || !step3 || !verifyText || !btnWhatsapp) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let isDrawing = false;
        let finished = false;
        let attempt = 1;
        const maxAttempts = 3;

        const layouts = [
            [
                {icon: 'trophy', val: 'R$ 1.000', win: true}, {icon: 'coins', val: 'R$ 5', win: false}, {icon: 'frown', val: 'Tente', win: false},
                {icon: 'trophy', val: 'R$ 1.000', win: true}, {icon: 'bolt', val: 'Bônus', win: false}, {icon: 'star', val: 'R$ 10', win: false},
                {icon: 'coins', val: 'R$ 2', win: false}, {icon: 'gem', val: 'R$ 50', win: false}, {icon: 'frown', val: 'Nada', win: false}
            ],
            [
                {icon: 'frown', val: 'Tente', win: false}, {icon: 'trophy', val: 'R$ 1.000', win: true}, {icon: 'coins', val: 'R$ 5', win: false},
                {icon: 'gem', val: 'R$ 20', win: false}, {icon: 'star', val: 'R$ 10', win: false}, {icon: 'trophy', val: 'R$ 1.000', win: true},
                {icon: 'bolt', val: 'Bônus', win: false}, {icon: 'coins', val: 'R$ 2', win: false}, {icon: 'frown', val: 'Nada', win: false}
            ],
            [
                {icon: 'trophy', val: 'R$ 1.000', win: true}, {icon: 'coins', val: 'R$ 5', win: false}, {icon: 'trophy', val: 'R$ 1.000', win: true},
                {icon: 'star', val: 'R$ 10', win: false}, {icon: 'trophy', val: 'R$ 1.000', win: true}, {icon: 'gem', val: 'R$ 50', win: false},
                {icon: 'bolt', val: 'Bônus', win: false}, {icon: 'coins', val: 'R$ 2', win: false}, {icon: 'frown', val: 'Nada', win: false}
            ]
        ];

        function renderGrid(attemptIndex: number) {
            const layout = layouts[attemptIndex - 1]; 
            gridContainer.innerHTML = ''; 
            layout.forEach(item => {
                const div = document.createElement('div');
                div.className = `grid-item ${item.win ? 'winner' : ''}`;
                div.innerHTML = `<i class="fas fa-${item.icon}"></i> ${item.val}`;
                gridContainer.appendChild(div);
            });
        }
        
        (window as any).startGame = () => {
            const startOverlay = startOverlayRef.current;
            if (startOverlay) {
                startOverlay.style.opacity = '0';
                setTimeout(() => startOverlay.style.display = 'none', 500);
            }
            setupRound();
        }

        function setupRound() {
            finished = false;
            attemptsText.innerText = `Tentativa ${attempt} de ${maxAttempts}`;
            renderGrid(attempt);
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            ctx.globalCompositeOperation = 'source-over'; 
            ctx.fillStyle = '#999999';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#444";
            ctx.font = "bold 30px Inter";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("RASPE AQUI", canvas.width/2, canvas.height/2);
            ctx.globalCompositeOperation = 'destination-out';
        }

        (window as any).resetGame = () => {
            lossModal.style.display = 'none';
            attempt++;
            setupRound();
        }

        function scratch(x: number, y: number) {
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();
            checkProgress();
        }

        function checkProgress() {
            if (finished) return;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let transparent = 0;
            for (let i = 3; i < imageData.data.length; i += 80) {
                if (imageData.data[i] < 128) transparent++;
            }
            if (transparent > (imageData.data.length / 80) * 0.40) {
                finished = true;
                ctx.clearRect(0,0, canvas.width, canvas.height); 
                setTimeout(() => {
                    if (attempt < maxAttempts) {
                        lossModal.style.display = 'flex';
                    } else {
                        showWinModal();
                    }
                }, 800);
            }
        }

        function getPos(e: MouseEvent | TouchEvent) {
            const rect = canvas.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        }

        const handleMouseDown = (e: MouseEvent) => { isDrawing = true; scratch(getPos(e).x, getPos(e).y); };
        const handleMouseMove = (e: MouseEvent) => { if(isDrawing) scratch(getPos(e).x, getPos(e).y); };
        const handleMouseUp = () => isDrawing = false;
        const handleTouchStart = (e: TouchEvent) => { isDrawing = true; e.preventDefault(); scratch(getPos(e).x, getPos(e).y); };
        const handleTouchMove = (e: TouchEvent) => { if(isDrawing) { e.preventDefault(); scratch(getPos(e).x, getPos(e).y); } };
        const handleTouchEnd = () => isDrawing = false;
        
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        
        // --- LÓGICA DO MODAL (PASSO A PASSO) ---
        function showWinModal() {
            winModal.style.display = 'flex';
            setTimeout(() => modalContent.classList.add('active'), 50);
            startConfetti();
        }

        (window as any).goToStep2 = () => {
            step1.style.display = 'none';
            step2.style.display = 'block';
        }

        (window as any).shareToUnlock = () => {
            const text = encodeURIComponent("🎁 Acabei de ganhar R$ 1.000,00 de bônus no Raspa Green! \n\nEstão dando 3 chances grátis pra todo mundo. \n\nClica aqui pra pegar o seu agora: 👇\n" + window.location.origin + "/premio");
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
            btnWhatsapp.style.display = 'none';
            verifyText.style.display = 'block';
            setTimeout(() => {
                step2.style.display = 'none';
                step3.style.display = 'block';
            }, 3000); 
        }

        (window as any).redirectToRegister = () => {
            router.push('/registro');
        }

        function startConfetti() {
            const c = confettiCanvasRef.current;
            if (!c) return;
            const x = c.getContext('2d');
            if (!x) return;
            c.width = window.innerWidth; c.height = window.innerHeight;
            const p = Array.from({length: 100}, () => ({
                x: Math.random()*c.width, y: Math.random()*c.height-c.height,
                vy: Math.random()*5+2, color: ['#2ee606','#fff','#ffd700'][Math.floor(Math.random()*3)]
            }));
            function loop() {
                if (!x || !c) return;
                x.clearRect(0,0,c.width,c.height);
                p.forEach(i => {
                    i.y += i.vy; if(i.y>c.height) i.y=-10;
                    x.fillStyle = i.color; x.beginPath(); x.arc(i.x, i.y, 5, 0, Math.PI*2); x.fill();
                });
                requestAnimationFrame(loop);
            }
            loop();
        }

        renderGrid(1); 
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        ctx.fillStyle = '#999999';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#444";
        ctx.font = "bold 30px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("RASPE AQUI", canvas.width/2, canvas.height/2);

        return () => {
            clearInterval(winnerInterval);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }

    }, [router]);

    return (
        <>
            <div className="winners-bar">
                <span id="winnerText" ref={winnerTextRef} className="winner-text">
                    <i className="fas fa-check-circle" style={{color:"#2ee606"}}></i> 
                    Carregando ganhadores...
                </span>
            </div>

            <main className="funnel-container">
                <h2 className="cta-title">Ganhe <span className="highlight">R$ 1.000,00</span> de Bônus</h2>
                <div className="attempts-display" id="attemptsText" ref={attemptsTextRef}>Tentativa 1 de 3</div>

                <div className="game-border-box">
                    <div className="game-inner-area" id="gameArea" ref={containerRef}>
                        <div className="grid-9-items" id="gridContainer" ref={gridContainerRef}></div>
                        <canvas id="scratch-canvas" ref={canvasRef}></canvas>
                        <div className="start-overlay" id="startOverlay" ref={startOverlayRef}>
                            <i className="fas fa-gift" style={{fontSize: "60px", color: "#2ee606", marginBottom: "20px"}}></i>
                            <p style={{color: "#fff", textAlign: "center", marginBottom: "30px", maxWidth: "80%"}}>
                                Você tem <strong>3 chances</strong> para encontrar 3 troféus e ganhar o bônus de aposta!
                            </p>
                            <button className="btn-start" onClick={() => (window as any).startGame()}>RASPAR AGORA</button>
                        </div>
                        <div className="modal-loss" id="lossModal" ref={lossModalRef}>
                            <div className="loss-content">
                                <i className="fas fa-frown" style={{fontSize: "40px", color: "#aaa", marginBottom: "10px"}}></i>
                                <h3 style={{color:"#fff", marginBottom: "5px"}}>Quase lá!</h3>
                                <p style={{color:"#888", fontSize: "0.9rem"}}>Você encontrou apenas 2 troféus.</p>
                                <button className="btn-retry" onClick={() => (window as any).resetGame()}>Tentar Novamente</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{color: "#666", fontSize: "0.8rem", marginTop: "20px"}}>*Bônus exclusivo para novos jogadores.</p>
            </main>

            <div className="modal-wrapper" id="winModal" ref={winModalRef}>
                <canvas id="confetti-canvas" ref={confettiCanvasRef}></canvas>
                <div className="modal-content" id="modalContent" ref={modalContentRef}>
                    <div id="step-1" ref={step1Ref}>
                        <i className="fas fa-medal" style={{fontSize: "60px", color: "#ffd700"}}></i>
                        <h2 style={{color: "#fff", margin: "10px 0"}}>PARABÉNS!</h2>
                        <p style={{color: "#aaa", marginBottom: "15px"}}>
                            Você encontrou os 3 troféus!
                        </p>
                        <div style={{background: "#222", padding: "15px", borderRadius: "8px", margin: "15px 0"}}>
                            <p style={{color: "#aaa", fontSize: "0.9rem", marginBottom: "5px"}}>Seu Bônus de Boas-Vindas:</p>
                            <div style={{color: "#2ee606", fontSize: "2.2rem", fontWeight: 900}}>R$ 1.000,00</div>
                        </div>
                        <button className="btn-claim-step1" onClick={() => (window as any).goToStep2()}>
                            RESGATAR BÔNUS AGORA
                        </button>
                    </div>
                    <div id="step-2" ref={step2Ref} style={{display: "none"}}>
                        <i className="fas fa-exclamation-circle" style={{fontSize: "50px", color: "#ffd700", marginBottom: "10px"}}></i>
                        <h2 style={{color: "#fff", margin: "5px 0"}}>AGUARDANDO ATIVAÇÃO</h2>
                        <div className="progress-text">95% Concluído</div>
                        <div className="progress-container">
                            <div className="progress-bar"></div>
                        </div>
                        <p style={{color: "#ccc", fontSize: "0.95rem", marginBottom: "20px", lineHeight: 1.5}}>
                            Seu saldo já está reservado! Para confirmar que você não é um robô, compartilhe com <strong>1 grupo no WhatsApp</strong>.
                        </p>
                        <button className="btn-whatsapp" ref={btnWhatsappRef} onClick={() => (window as any).shareToUnlock()}>
                            <i className="fab fa-whatsapp" style={{fontSize: "1.3rem"}}></i> ATIVAR MEU BÔNUS
                        </button>
                        <p id="verify-text" ref={verifyTextRef} style={{display:"none", color: "#aaa", fontSize: "0.8rem", marginTop: "15px"}}>
                            <i className="fas fa-spinner fa-spin"></i> Verificando compartilhamento...
                        </p>
                    </div>
                    <div id="step-3" ref={step3Ref} style={{display: "none"}}>
                        <i className="fas fa-check-circle" style={{fontSize: "60px", color: "#2ee606"}}></i>
                        <h2 style={{color: "#2ee606", margin: "10px 0"}}>SALDO LIBERADO!</h2>
                        <p style={{color: "#aaa", marginBottom: "20px"}}>
                            Seu bônus de R$ 1.000,00 já está pronto para uso.
                        </p>
                        <button className="btn-final" onClick={() => (window as any).redirectToRegister()}>
                            JOGAR AGORA <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
