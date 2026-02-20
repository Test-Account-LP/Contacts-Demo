import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
    SEGMENTS,
    SEGMENT_ANGLE,
    pickReward,
    segmentIndexForReward,
    calcRotationForSegment,
    canSpin,
    setLastSpinTimestamp,
    msUntilNextSpin,
    formatCountdown,
    type SpinReward,
} from '../utils/spinGame';

interface SpinWheelScreenProps {
    onBack: () => void;
    onPointsEarned: (points: number) => void;
    currentPoints: number;
}

type Phase = 'idle' | 'confirming' | 'spinning' | 'result';

export default function SpinWheelScreen({ onBack, onPointsEarned }: SpinWheelScreenProps) {
    // --- cooldown state ---
    const [cooldownMs, setCooldownMs] = useState(msUntilNextSpin());
    const [spinEnabled, setSpinEnabled] = useState(canSpin());

    // --- phase & reward ---
    const [phase, setPhase] = useState<Phase>('idle');
    const [pendingReward, setPendingReward] = useState<SpinReward | null>(null);
    const [earnedReward, setEarnedReward] = useState<SpinReward | null>(null);

    // --- wheel rotation ---
    const [rotation, setRotation] = useState(0);
    const rotationRef = useRef(0);

    // Countdown ticker
    useEffect(() => {
        if (spinEnabled) return;
        const id = setInterval(() => {
            const remaining = msUntilNextSpin();
            setCooldownMs(remaining);
            if (remaining === 0) {
                setSpinEnabled(true);
                clearInterval(id);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [spinEnabled]);

    const handleSpinPress = () => {
        if (!spinEnabled || phase !== 'idle') return;
        const reward = pickReward();
        setPendingReward(reward);
        setPhase('confirming');
    };

    const handleConfirm = useCallback(() => {
        if (pendingReward === null) return;
        setSpinEnabled(false);
        setPhase('spinning');

        const segIdx = segmentIndexForReward(pendingReward);
        const finalRotation = calcRotationForSegment(segIdx, rotationRef.current);
        rotationRef.current = finalRotation;
        setRotation(finalRotation);

        const duration = 3500;
        setTimeout(() => {
            setLastSpinTimestamp();
            if (pendingReward > 0) {
                onPointsEarned(pendingReward);
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#7c3aed', '#fbbf24', '#06b6d4'] });
            }
            setEarnedReward(pendingReward);
            setPhase('result');
        }, duration + 200);
    }, [pendingReward, onPointsEarned]);

    const handleSpinAgain = () => {
        setPendingReward(null);
        setEarnedReward(null);
        setPhase('idle');
        const remaining = msUntilNextSpin();
        setCooldownMs(remaining);
        setSpinEnabled(remaining === 0);
    };

    // Build SVG wheel paths
    const cx = 160, cy = 160, r = 148;

    const buildPath = (index: number) => {
        const startAngle = (index * SEGMENT_ANGLE - 90) * (Math.PI / 180);
        const endAngle = ((index + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
    };

    const getLabelPosition = (index: number) => {
        const angle = (index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2 - 90) * (Math.PI / 180);
        return {
            x: cx + (r * 0.66) * Math.cos(angle),
            y: cy + (r * 0.66) * Math.sin(angle),
        };
    };

    const isSpinning = phase === 'spinning';

    return (
        // Full-screen overlay — renders inside Layout's absolute overlay slot
        <div className="h-full w-full flex flex-col justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            {/* Floating close button */}
            <button
                onClick={onBack}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10"
            >
                <X size={20} className="text-slate-800" />
            </button>

            {/* Bottom sheet panel */}
            <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col" style={{ maxHeight: '92vh' }}>
                {/* Sheet content — scrollable */}
                <div className="px-5 pt-5 pb-0">
                    {/* Account pill */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-teal-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Main Account</span>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Pera Lucky Spin</h1>
                    <p className="text-sm text-slate-500 leading-snug mb-5">
                        Spin the wheel for a chance to score awesome rewards. Keep spinning until you're tired of winning!
                    </p>

                    {/* Daily streak */}
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mb-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Gift size={18} className="text-violet-500" />
                            Current Daily Streak
                        </div>
                        <div className="text-sm font-bold text-slate-900">5 days</div>
                    </div>

                    {/* CTA / state button */}
                    {phase === 'confirming' ? (
                        <>
                            <div className="w-full py-4 rounded-2xl bg-slate-100 text-center text-sm text-slate-400 font-semibold mb-1">
                                Confirming transaction...
                            </div>
                            <div className="text-center text-xs text-slate-400 mb-4">1 credits left</div>

                            {/* Mini transaction confirm sheet */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
                                <div className="text-center mb-3">
                                    <div className="text-xl font-mono font-bold text-slate-900">0.00 ALGO</div>
                                    <div className="text-xs text-slate-400">$0.00</div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                    <div className="w-3 h-3 rounded bg-teal-400" /> Spending Account
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 mb-3">
                                    <span>Network Fee</span><span className="font-mono">Ⲁ0</span>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setPhase('idle')} className="flex-1 py-2.5 bg-slate-200 rounded-xl font-bold text-sm text-slate-700">Cancel</button>
                                    <button onClick={handleConfirm} className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm">Confirm</button>
                                </div>
                            </div>
                        </>
                    ) : !spinEnabled ? (
                        <>
                            <div className="w-full py-4 rounded-2xl bg-slate-100 text-center text-sm text-slate-400 font-semibold mb-1">
                                Next spin in {formatCountdown(cooldownMs)}
                            </div>
                            <div className="text-center text-xs text-slate-400 mb-4">0 credits left</div>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSpinPress}
                                disabled={isSpinning || phase !== 'idle'}
                                className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-50 mb-1"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                            >
                                {isSpinning ? 'Spinning…' : 'Sign transaction'}
                            </button>
                            <div className="text-center text-xs text-slate-400 mb-4">
                                {spinEnabled ? '1 credit available' : '0 credits left'}
                            </div>
                        </>
                    )}
                </div>

                {/* Wheel — half visible at the bottom, wider than container */}
                <div className="relative flex justify-center" style={{ height: 220, overflow: 'visible' }}>
                    {/* Gold arrow pointer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <svg width="28" height="40" viewBox="0 0 28 40">
                            <polygon points="14,2 26,30 14,38 2,30" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                        </svg>
                    </div>

                    {/* Spinning wheel */}
                    <div
                        style={{
                            width: 340,
                            height: 340,
                            position: 'absolute',
                            top: 24,
                            transition: isSpinning
                                ? 'transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 1.0)'
                                : 'none',
                            transform: `rotate(${rotation}deg)`,
                            borderRadius: '50%',
                        }}
                    >
                        <svg width="340" height="340" viewBox="0 0 320 320">
                            <defs>
                                <linearGradient id="rimGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f472b6" />
                                    <stop offset="30%" stopColor="#fbbf24" />
                                    <stop offset="60%" stopColor="#34d399" />
                                    <stop offset="90%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                            {/* Dark outer rim */}
                            <circle cx={cx} cy={cy} r={r + 10} fill="#1a1a2e" />
                            {/* Rainbow ring */}
                            <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="url(#rimGrad2)" strokeWidth="6" />

                            {/* Segments */}
                            {SEGMENTS.map((seg, i) => {
                                const pos = getLabelPosition(i);
                                return (
                                    <g key={i}>
                                        <path d={buildPath(i)} fill={seg.color} stroke="#1a1a2e" strokeWidth="1.5" />
                                        <text
                                            x={pos.x} y={pos.y}
                                            textAnchor="middle" dominantBaseline="middle"
                                            fill="white" fontSize="12" fontWeight="bold"
                                        >
                                            {seg.points === 0 ? '✕' : `+${seg.points}`}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Center hub */}
                            <circle cx={cx} cy={cy} r={22} fill="#1e1b4b" />
                            <circle cx={cx} cy={cy} r={20} fill="#1e1b4b" stroke="url(#rimGrad2)" strokeWidth="3" />
                            {/* Pera flower */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                                <ellipse
                                    key={i}
                                    cx={cx + 6 * Math.cos(deg * Math.PI / 180)}
                                    cy={cy + 6 * Math.sin(deg * Math.PI / 180)}
                                    rx={2.5} ry={1.4}
                                    transform={`rotate(${deg}, ${cx + 6 * Math.cos(deg * Math.PI / 180)}, ${cy + 6 * Math.sin(deg * Math.PI / 180)})`}
                                    fill="white" opacity="0.95"
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>

            {/* ─── Transaction Overlay (mobile-width centered) ─── */}
            {/* Removed — we embed tx confirmation inline above */}

            {/* ─── Result Modal ─── */}
            {phase === 'result' && earnedReward !== null && (
                <div className="absolute inset-0 flex items-end z-30" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <div className="w-full bg-white rounded-t-3xl p-6 pb-12 relative">
                        <button
                            onClick={canSpin() ? handleSpinAgain : onBack}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
                        >
                            <X size={16} className="text-slate-700" />
                        </button>

                        {earnedReward > 0 ? (
                            // ─── WIN ───
                            <>
                                <div className="text-4xl mb-4">🎉</div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Congratulations, You've made it!</h2>
                                <p className="text-slate-500 text-sm mb-6">You can claim your reward to your account.</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                        <span className="text-sm text-slate-500">Account</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-teal-400" />
                                            <span className="font-semibold text-sm text-slate-800">Main Account</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-slate-500">Reward</span>
                                        <span className="font-bold text-lg text-slate-900">{earnedReward} Pera Points</span>
                                    </div>
                                </div>

                                <button
                                    onClick={canSpin() ? handleSpinAgain : onBack}
                                    className="w-full py-4 rounded-2xl font-bold text-white text-base"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                                >
                                    {canSpin() ? 'Spin Again' : 'Close'}
                                </button>
                            </>
                        ) : (
                            // ─── LOSE ───
                            <>
                                {/* Pink ring + sparkle icon */}
                                <div className="relative w-14 h-14 mb-4">
                                    <svg viewBox="0 0 56 56" className="w-14 h-14">
                                        <circle cx="28" cy="28" r="22" fill="none" stroke="#f43f5e" strokeWidth="4" />
                                        {/* Sparkle dots */}
                                        <circle cx="44" cy="10" r="3" fill="#f43f5e" opacity="0.7" />
                                        <circle cx="48" cy="18" r="2" fill="#f43f5e" opacity="0.4" />
                                    </svg>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-2">So close!</h2>
                                <p className="text-slate-600 text-sm mb-8">
                                    This was not your Lucky Spin. Try again for more chances!
                                </p>

                                <button
                                    onClick={canSpin() ? handleSpinAgain : onBack}
                                    className="w-full py-4 rounded-2xl font-bold text-white text-base"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                                >
                                    {canSpin() ? 'Try Again' : 'Close'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
