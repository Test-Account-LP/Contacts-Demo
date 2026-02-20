import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Canvas / game constants ──────────────────────────────────────────
const CW = 320, CH = 420;
const BALL_R = 8;
const PADDLE_H = 12;
const PADDLE_Y = CH - 52;
const PADDLE_SPEED = 6;
const COLS = 8;
const BW = 35, BH = 18, BGAP = 4;
const BRICK_X0 = Math.round((CW - COLS * (BW + BGAP) + BGAP) / 2);
const BRICK_Y0 = 44;
const BB_KEY = 'pera_brickbreaker_session';
const COOLDOWN = 86_400_000;

// Brick color by maxHp
const HP_COLOR: Record<number, string> = { 1: '#5eead4', 2: '#60a5fa', 3: '#c084fc' };

interface Brick { x: number; y: number; hp: number; maxHp: number; }
interface LevelCfg { rows: number; speed: number; paddleW: number; hpRow: number[]; }
type Phase = 'cooldown' | 'intro' | 'playing' | 'lost-life' | 'level-complete' | 'game-over' | 'victory';

const LEVELS: LevelCfg[] = [
    { rows: 2, speed: 4.0, paddleW: 90, hpRow: [1, 1] },
    { rows: 2, speed: 4.5, paddleW: 85, hpRow: [1, 1] },
    { rows: 3, speed: 4.5, paddleW: 80, hpRow: [1, 1, 1] },
    { rows: 3, speed: 5.0, paddleW: 80, hpRow: [2, 1, 1] },
    { rows: 4, speed: 5.0, paddleW: 75, hpRow: [2, 2, 1, 1] },
    { rows: 4, speed: 5.5, paddleW: 70, hpRow: [2, 2, 2, 1] },
    { rows: 5, speed: 5.5, paddleW: 65, hpRow: [3, 2, 2, 1, 1] },
    { rows: 5, speed: 6.0, paddleW: 60, hpRow: [3, 2, 2, 2, 1] },
    { rows: 6, speed: 6.0, paddleW: 55, hpRow: [3, 3, 2, 2, 1, 1] },
    { rows: 6, speed: 6.5, paddleW: 50, hpRow: [3, 3, 3, 2, 2, 2] },
];

// ── Session helpers ───────────────────────────────────────────────────
function cooldownRemaining(): number {
    try {
        const s = JSON.parse(localStorage.getItem(BB_KEY) || 'null');
        if (!s) return 0;
        return Math.max(0, COOLDOWN - (Date.now() - s.startedAt));
    } catch { return 0; }
}
function startSession() { localStorage.setItem(BB_KEY, JSON.stringify({ startedAt: Date.now() })); }
function fmtCd(ms: number) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ── Component ─────────────────────────────────────────────────────────
interface Props { onBack: () => void; onPointsEarned: (pts: number) => void; }

export default function BrickBreakerScreen({ onBack, onPointsEarned }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phaseRef = useRef<Phase>('intro');

    // All game state in a ref — avoids stale closures in the RAF loop
    const gs = useRef({
        ball: { x: CW / 2, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0 },
        paddleX: CW / 2,
        bricks: [] as Brick[],
        level: 0,
        lives: 3,
        score: 0,
        leftDown: false,
        rightDown: false,
        launched: false,
    });

    const [phase, setPhase] = useState<Phase>(() => cooldownRemaining() > 0 ? 'cooldown' : 'intro');
    const [uiLives, setUILives] = useState(3);
    const [uiScore, setUIScore] = useState(0);
    const [uiLevel, setUILevel] = useState(1);
    const [levelPts, setLevelPts] = useState(0);
    const [cdMs, setCdMs] = useState(cooldownRemaining());

    const goPhase = (p: Phase) => { phaseRef.current = p; setPhase(p); };

    // Cooldown countdown
    useEffect(() => {
        if (phase !== 'cooldown') return;
        const id = setInterval(() => {
            const r = cooldownRemaining();
            setCdMs(r);
            if (r === 0) goPhase('intro');
        }, 1000);
        return () => clearInterval(id);
    }, [phase]);

    // Build brick grid for a level
    const buildBricks = (lvlIdx: number): Brick[] => {
        const cfg = LEVELS[lvlIdx];
        const out: Brick[] = [];
        for (let row = 0; row < cfg.rows; row++) {
            const hp = cfg.hpRow[row] ?? 1;
            for (let col = 0; col < COLS; col++) {
                out.push({ x: BRICK_X0 + col * (BW + BGAP), y: BRICK_Y0 + row * (BH + BGAP), hp, maxHp: hp });
            }
        }
        return out;
    };

    // Initialise a level (or respawn after life lost)
    const initLevel = useCallback((lvlIdx: number) => {
        gs.current.bricks = buildBricks(lvlIdx);
        gs.current.level = lvlIdx;
        gs.current.launched = false;
        gs.current.ball = { x: gs.current.paddleX, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0 };
        setTimeout(() => {
            if (phaseRef.current !== 'playing') return;
            const s = LEVELS[lvlIdx].speed;
            const angle = (Math.random() * 0.4 - 0.2); // slight random angle
            gs.current.ball.vx = s * angle;
            gs.current.ball.vy = -s * Math.sqrt(1 - angle * angle);
            gs.current.launched = true;
        }, 900);
    }, []);

    // Draw one frame to canvas
    const draw = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const g = gs.current;
        const lvl = LEVELS[g.level] ?? LEVELS[0];

        // Background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, CW, CH);
        // Subtle grid
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < CW; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CH); ctx.stroke(); }
        for (let y = 0; y < CH; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CW, y); ctx.stroke(); }

        // Bricks
        for (const b of g.bricks) {
            if (b.hp <= 0) continue;
            const t = b.hp / b.maxHp;
            ctx.globalAlpha = 0.45 + t * 0.55;
            ctx.fillStyle = HP_COLOR[b.maxHp] ?? '#94a3b8';
            ctx.beginPath();
            (ctx as CanvasRenderingContext2D & { roundRect: (...a: number[]) => void }).roundRect(b.x + 1, b.y + 1, BW - 2, BH - 2, 4);
            ctx.fill();
            ctx.globalAlpha = 0.18;
            ctx.fillStyle = 'white';
            ctx.fillRect(b.x + 3, b.y + 2, BW - 6, 4);
            ctx.globalAlpha = 1;
            if (b.maxHp > 1) {
                for (let i = 0; i < b.hp; i++) {
                    ctx.fillStyle = 'rgba(255,255,255,0.85)';
                    ctx.beginPath();
                    ctx.arc(b.x + BW / 2 + (i - (b.hp - 1) / 2) * 7, b.y + BH / 2, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Ball
        const gr = ctx.createRadialGradient(g.ball.x - 2, g.ball.y - 2, 1, g.ball.x, g.ball.y, BALL_R);
        gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#94a3b8');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2);
        ctx.fill();

        // Paddle
        const pw = lvl.paddleW, px = g.paddleX - pw / 2;
        const pg = ctx.createLinearGradient(px, PADDLE_Y, px, PADDLE_Y + PADDLE_H);
        pg.addColorStop(0, '#c4b5fd'); pg.addColorStop(1, '#7c3aed');
        ctx.fillStyle = pg;
        ctx.beginPath();
        (ctx as CanvasRenderingContext2D & { roundRect: (...a: number[]) => void }).roundRect(px, PADDLE_Y, pw, PADDLE_H, 6);
        ctx.fill();
    }, []);

    // Static preview draw (intro/cooldown)
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, CW, CH);
        const cfg = LEVELS[0];
        for (let row = 0; row < cfg.rows; row++) {
            const hp = cfg.hpRow[row] ?? 1;
            for (let col = 0; col < COLS; col++) {
                const x = BRICK_X0 + col * (BW + BGAP), y = BRICK_Y0 + row * (BH + BGAP);
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = HP_COLOR[hp] ?? '#94a3b8';
                ctx.beginPath();
                (ctx as CanvasRenderingContext2D & { roundRect: (...a: number[]) => void }).roundRect(x + 1, y + 1, BW - 2, BH - 2, 4);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
        // Paddle
        const pg = ctx.createLinearGradient(CW / 2 - 45, PADDLE_Y, CW / 2 - 45, PADDLE_Y + PADDLE_H);
        pg.addColorStop(0, '#c4b5fd'); pg.addColorStop(1, '#7c3aed');
        ctx.fillStyle = pg;
        ctx.beginPath();
        (ctx as CanvasRenderingContext2D & { roundRect: (...a: number[]) => void }).roundRect(CW / 2 - 45, PADDLE_Y, 90, PADDLE_H, 6);
        ctx.fill();
    }, []);

    // ── Main game loop ──────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'playing') return;
        let rafId: number;

        const loop = () => {
            if (phaseRef.current !== 'playing') return;
            const g = gs.current;
            const lvl = LEVELS[g.level];

            // Paddle movement
            if (g.leftDown) g.paddleX = Math.max(lvl.paddleW / 2, g.paddleX - PADDLE_SPEED);
            if (g.rightDown) g.paddleX = Math.min(CW - lvl.paddleW / 2, g.paddleX + PADDLE_SPEED);

            if (!g.launched) {
                // Ball sits on paddle before launch
                g.ball.x = g.paddleX;
                g.ball.y = PADDLE_Y - BALL_R - 1;
            } else {
                // Move ball
                g.ball.x += g.ball.vx;
                g.ball.y += g.ball.vy;

                // Wall bounces
                if (g.ball.x - BALL_R < 0) { g.ball.x = BALL_R; g.ball.vx = Math.abs(g.ball.vx); }
                if (g.ball.x + BALL_R > CW) { g.ball.x = CW - BALL_R; g.ball.vx = -Math.abs(g.ball.vx); }
                if (g.ball.y - BALL_R < 0) { g.ball.y = BALL_R; g.ball.vy = Math.abs(g.ball.vy); }

                // Paddle collision
                const pw = lvl.paddleW, px = g.paddleX - pw / 2;
                const hitY = g.ball.y + BALL_R;
                if (g.ball.vy > 0 && hitY >= PADDLE_Y && hitY <= PADDLE_Y + PADDLE_H + Math.abs(g.ball.vy)
                    && g.ball.x >= px - BALL_R && g.ball.x <= px + pw + BALL_R) {
                    const rel = Math.max(-1, Math.min(1, (g.ball.x - g.paddleX) / (pw / 2)));
                    const maxAng = 65 * (Math.PI / 180), angle = rel * maxAng;
                    const spd = Math.sqrt(g.ball.vx * g.ball.vx + g.ball.vy * g.ball.vy);
                    g.ball.vx = spd * Math.sin(angle);
                    g.ball.vy = -spd * Math.cos(angle);
                    g.ball.y = PADDLE_Y - BALL_R - 1;
                }

                // Brick collision (AABB, first hit only)
                for (const b of g.bricks) {
                    if (b.hp <= 0) continue;
                    if (g.ball.x + BALL_R < b.x || g.ball.x - BALL_R > b.x + BW ||
                        g.ball.y + BALL_R < b.y || g.ball.y - BALL_R > b.y + BH) continue;
                    const oL = (g.ball.x + BALL_R) - b.x, oR = (b.x + BW) - (g.ball.x - BALL_R);
                    const oT = (g.ball.y + BALL_R) - b.y, oB = (b.y + BH) - (g.ball.y - BALL_R);
                    const m = Math.min(oL, oR, oT, oB);
                    if (m === oL) { g.ball.vx = -Math.abs(g.ball.vx); g.ball.x = b.x - BALL_R - 0.5; }
                    else if (m === oR) { g.ball.vx = Math.abs(g.ball.vx); g.ball.x = b.x + BW + BALL_R + 0.5; }
                    else if (m === oT) { g.ball.vy = -Math.abs(g.ball.vy); g.ball.y = b.y - BALL_R - 0.5; }
                    else { g.ball.vy = Math.abs(g.ball.vy); g.ball.y = b.y + BH + BALL_R + 0.5; }
                    b.hp--;
                    break;
                }

                // Ball off bottom = lost life
                if (g.ball.y - BALL_R > CH) {
                    g.lives--;
                    setUILives(g.lives);
                    if (g.lives <= 0) {
                        phaseRef.current = 'game-over';
                        setPhase('game-over');
                    } else {
                        phaseRef.current = 'lost-life';
                        setPhase('lost-life');
                    }
                    return;
                }

                // Level complete
                if (g.bricks.every(b => b.hp <= 0)) {
                    const pts = (g.level + 1) * 10;
                    g.score += pts;
                    setLevelPts(pts);
                    setUIScore(g.score);
                    onPointsEarned(pts);
                    phaseRef.current = 'level-complete';
                    setPhase('level-complete');
                    return;
                }
            }

            draw();
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [phase, draw, onPointsEarned]);

    // Lost life → respawn ball after delay
    useEffect(() => {
        if (phase !== 'lost-life') return;
        const t = setTimeout(() => {
            if (phaseRef.current !== 'lost-life') return;
            gs.current.launched = false;
            gs.current.ball = { x: gs.current.paddleX, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0 };
            setTimeout(() => {
                if (phaseRef.current !== 'playing') return;
                const s = LEVELS[gs.current.level].speed;
                gs.current.ball.vx = s * (Math.random() * 0.4 - 0.2);
                gs.current.ball.vy = -s;
                gs.current.launched = true;
            }, 700);
            phaseRef.current = 'playing';
            setPhase('playing');
        }, 1300);
        return () => clearTimeout(t);
    }, [phase]);

    // Level complete → next level after delay
    useEffect(() => {
        if (phase !== 'level-complete') return;
        const next = gs.current.level + 1;
        const t = setTimeout(() => {
            if (phaseRef.current !== 'level-complete') return;
            if (next >= LEVELS.length) {
                phaseRef.current = 'victory';
                setPhase('victory');
            } else {
                gs.current.paddleX = CW / 2;
                initLevel(next);
                setUILevel(next + 1);
                phaseRef.current = 'playing';
                setPhase('playing');
            }
        }, 2000);
        return () => clearTimeout(t);
    }, [phase, initLevel]);

    // Start game
    const handlePlay = () => {
        startSession();
        const g = gs.current;
        g.lives = 3; g.score = 0; g.paddleX = CW / 2;
        setUILives(3); setUIScore(0); setUILevel(1);
        initLevel(0);
        goPhase('playing');
    };

    // Paddle buttons
    const onLeft = (d: boolean) => { gs.current.leftDown = d; };
    const onRight = (d: boolean) => { gs.current.rightDown = d; };

    const isActive = phase === 'playing' || phase === 'lost-life' || phase === 'level-complete';

    return (
        <div className="h-full w-full flex flex-col justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <button onClick={onBack} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
                <X size={20} className="text-slate-800" />
            </button>

            <div className="bg-slate-950 rounded-t-3xl overflow-hidden flex flex-col" style={{ maxHeight: '94%' }}>
                {/* HUD */}
                <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-800">
                    <span className="text-white font-bold text-sm tracking-wide">BRICK BREAKER</span>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                                <Heart key={i} size={15} className={i < uiLives ? 'text-red-400 fill-red-400' : 'text-slate-700 fill-slate-700'} />
                            ))}
                        </div>
                        <span className="text-violet-400 font-mono text-xs font-bold">LVL {uiLevel}</span>
                        <span className="text-yellow-400 font-mono text-xs font-bold">{uiScore}pts</span>
                    </div>
                </div>

                {/* Game canvas */}
                <div className="flex justify-center bg-slate-950">
                    <div className="relative" style={{ width: CW, height: CH }}>
                        <canvas ref={canvasRef} width={CW} height={CH} className="block" />

                        {phase === 'cooldown' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.92)' }}>
                                <div className="text-4xl mb-3">⏳</div>
                                <div className="text-white font-bold text-lg mb-1">Come back soon</div>
                                <div className="text-violet-400 font-mono text-3xl font-bold">{fmtCd(cdMs)}</div>
                                <div className="text-slate-500 text-xs mt-3">One session per 24 hours</div>
                            </div>
                        )}
                        {phase === 'intro' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.88)' }}>
                                <div className="text-4xl mb-2">🧱</div>
                                <div className="text-white font-bold text-2xl mb-1">Brick Breaker</div>
                                <div className="text-slate-400 text-xs mb-1">10 levels · 3 lives</div>
                                <div className="text-slate-500 text-xs mb-6">Points sync to Pera Rewards</div>
                                <button onClick={handlePlay} className="px-10 py-3.5 rounded-2xl font-bold text-white" style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                                    Play
                                </button>
                            </div>
                        )}
                        {phase === 'lost-life' && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.6)' }}>
                                <div className="rounded-2xl px-8 py-5 text-center" style={{ backgroundColor: 'rgba(127,29,29,0.85)' }}>
                                    <div className="text-2xl mb-1">💔</div>
                                    <div className="text-white font-bold text-sm">{uiLives} {uiLives === 1 ? 'life' : 'lives'} remaining</div>
                                </div>
                            </div>
                        )}
                        {phase === 'level-complete' && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.65)' }}>
                                <div className="rounded-2xl px-8 py-5 text-center" style={{ backgroundColor: 'rgba(76,29,149,0.85)' }}>
                                    <div className="text-2xl mb-1">🎉</div>
                                    <div className="text-white font-bold">Level {uiLevel} Clear!</div>
                                    <div className="text-yellow-400 font-bold text-sm mt-1">+{levelPts} pts</div>
                                </div>
                            </div>
                        )}
                        {phase === 'game-over' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.92)' }}>
                                <div className="text-3xl mb-3">💀</div>
                                <div className="text-white font-bold text-xl mb-1">Game Over</div>
                                <div className="text-slate-400 text-sm">Reached level {uiLevel}</div>
                                <div className="text-yellow-400 font-bold text-lg mt-2">{uiScore} pts earned</div>
                                <button onClick={onBack} className="mt-5 px-6 py-2.5 rounded-xl font-bold text-white bg-slate-700 text-sm">Close</button>
                            </div>
                        )}
                        {phase === 'victory' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.92)' }}>
                                <div className="text-3xl mb-3">🏆</div>
                                <div className="text-white font-bold text-xl mb-1">All Clear!</div>
                                <div className="text-slate-400 text-sm">10 levels completed</div>
                                <div className="text-yellow-400 font-bold text-xl mt-2">{uiScore} pts</div>
                                <div className="text-emerald-400 text-xs mt-1">Added to Pera Rewards ✓</div>
                                <button onClick={onBack} className="mt-5 px-8 py-3 rounded-2xl font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                                    Claim
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Paddle controls */}
                {isActive ? (
                    <div className="flex gap-4 px-6 py-4 justify-center bg-slate-950">
                        <button
                            className="flex-1 max-w-36 h-14 rounded-2xl flex items-center justify-center bg-slate-700 active:bg-slate-600 select-none touch-none"
                            onPointerDown={() => onLeft(true)} onPointerUp={() => onLeft(false)} onPointerLeave={() => onLeft(false)}
                        >
                            <ChevronLeft size={30} className="text-white" />
                        </button>
                        <button
                            className="flex-1 max-w-36 h-14 rounded-2xl flex items-center justify-center bg-slate-700 active:bg-slate-600 select-none touch-none"
                            onPointerDown={() => onRight(true)} onPointerUp={() => onRight(false)} onPointerLeave={() => onRight(false)}
                        >
                            <ChevronRight size={30} className="text-white" />
                        </button>
                    </div>
                ) : <div className="h-6 bg-slate-950" />}
            </div>
        </div>
    );
}
