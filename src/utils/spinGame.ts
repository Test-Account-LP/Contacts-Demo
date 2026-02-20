// Spin Game Logic — probability, cooldown, segment math

export type SpinReward = 100 | 50 | 10 | 0;

export interface SpinSegment {
    points: SpinReward;
    label: string;
    color: string;
    lightColor: string;
    // Count of segments on the wheel for this reward
    count: number;
}

// 8 total segments matching probability weights
// 10% = 100pts  → 1 segment
// 30% = 50pts   → 2 segments  (approx, see weighted algo below)
// 50% = 10pts   → 4 segments
// 10% = 0pts    → 1 segment
// Total = 8 — but visual landing uses the weighted algorithm, not segment count

export const SEGMENTS: SpinSegment[] = [
    { points: 100, label: '100 pts', color: '#7c3aed', lightColor: '#ede9fe', count: 1 },
    { points: 10, label: '10 pts', color: '#64748b', lightColor: '#f1f5f9', count: 1 },
    { points: 50, label: '50 pts', color: '#0ea5e9', lightColor: '#e0f2fe', count: 1 },
    { points: 10, label: '10 pts', color: '#94a3b8', lightColor: '#f8fafc', count: 1 },
    { points: 50, label: '50 pts', color: '#06b6d4', lightColor: '#cffafe', count: 1 },
    { points: 10, label: '10 pts', color: '#64748b', lightColor: '#f1f5f9', count: 1 },
    { points: 0, label: 'Try Again', color: '#334155', lightColor: '#e2e8f0', count: 1 },
    { points: 10, label: '10 pts', color: '#94a3b8', lightColor: '#f8fafc', count: 1 },
];

export const SEGMENT_COUNT = SEGMENTS.length; // 8
export const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 45°

/**
 * Weighted random reward picker.
 * 10% → 100 pts, 30% → 50 pts, 50% → 10 pts, 10% → 0 pts
 */
export function pickReward(): SpinReward {
    const r = Math.random();
    if (r < 0.10) return 100;
    if (r < 0.40) return 50;
    if (r < 0.90) return 10;
    return 0;
}

/**
 * Given a reward, pick a random segment index in SEGMENTS that matches.
 */
export function segmentIndexForReward(reward: SpinReward): number {
    const matching = SEGMENTS
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => s.points === reward);
    const pick = matching[Math.floor(Math.random() * matching.length)];
    return pick.i;
}

/**
 * Calculate the final CSS rotation (in degrees) to spin the wheel so that
 * the chosen segment index lands at the top (where the pointer is).
 * We add full rotations for the spinning effect.
 */
export function calcRotationForSegment(
    segmentIndex: number,
    currentRotation: number,
    minSpins = 5,
    maxSpins = 8
): number {
    const extraSpins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
    // Center of the target segment angle offset from 0
    const targetAngle = segmentIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    // We want to land so targetAngle is at top (0°). Wheel starts at 0.
    const fullSpins = extraSpins * 360;
    return currentRotation + fullSpins + (360 - targetAngle);
}

// --- Cooldown ---
const COOLDOWN_KEY = 'pera_spin_last_timestamp';
export const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getLastSpinTimestamp(): number | null {
    const v = localStorage.getItem(COOLDOWN_KEY);
    return v ? parseInt(v, 10) : null;
}

export function setLastSpinTimestamp(): void {
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
}

export function msUntilNextSpin(): number {
    const last = getLastSpinTimestamp();
    if (!last) return 0;
    const elapsed = Date.now() - last;
    return Math.max(0, COOLDOWN_MS - elapsed);
}

export function canSpin(): boolean {
    return msUntilNextSpin() === 0;
}

export function formatCountdown(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
