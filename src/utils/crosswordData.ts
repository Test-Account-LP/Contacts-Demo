// Daily Mini Crossword — Puzzle Data
// 5x5 grid, black cells at (1,1),(1,3),(3,1),(3,3) — standard diamond pattern
// Across: rows 0, 2, 4 | Down: cols 0, 2, 4

export interface CrosswordClue {
    number: string;
    clue: string;
    answer: string;
    row: number;
    col: number;
    dir: 'across' | 'down';
}

export interface CrosswordPuzzle {
    date: string; // set at runtime to YYYY-MM-DD
    title: string;
    solution: (string | null)[][];
    clues: CrosswordClue[];
}

// ── 10 unique 5×5 puzzles ─────────────────────────────────────────────────────
// Black cells always at (1,1),(1,3),(3,1),(3,3)
const PUZZLE_BANK: Omit<CrosswordPuzzle, 'date'>[] = [
    {
        title: 'Mini Crossword #1',
        solution: [
            ['C', 'I', 'D', 'E', 'R'],
            ['R', null, 'U', null, 'E'],
            ['O', 'Z', 'O', 'N', 'E'],
            ['C', null, 'M', null, 'D'],
            ['S', 'N', 'O', 'B', 'S'],
        ],
        clues: [
            { number: '1', clue: 'Apple drink', answer: 'CIDER', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Atmospheric layer', answer: 'OZONE', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Social climbers', answer: 'SNOBS', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Large reptiles', answer: 'CROCS', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Italian cathedral dome', answer: 'DUOMO', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Marsh plants', answer: 'REEDS', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #2',
        solution: [
            ['B', 'R', 'A', 'V', 'E'],
            ['E', null, 'R', null, 'V'],
            ['A', 'B', 'O', 'V', 'E'],
            ['R', null, 'S', null, 'N'],
            ['S', 'W', 'E', 'P', 'T'],
        ],
        clues: [
            { number: '1', clue: 'Courageous', answer: 'BRAVE', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Higher than', answer: 'ABOVE', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Cleaned with a broom', answer: 'SWEPT', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Woodland animals', answer: 'BEARS', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Got up (past tense)', answer: 'AROSE', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Occasion or happening', answer: 'EVENT', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #3',
        solution: [
            ['T', 'O', 'A', 'D', 'Y'],
            ['R', null, 'B', null, 'I'],
            ['A', 'R', 'O', 'S', 'E'],
            ['C', null, 'D', null, 'L'],
            ['E', 'M', 'E', 'N', 'D'],
        ],
        clues: [
            { number: '1', clue: 'A yes-man', answer: 'TOADY', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Got up (past tense)', answer: 'AROSE', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Correct or revise text', answer: 'EMEND', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Follow a path', answer: 'TRACE', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Home or dwelling', answer: 'ABODE', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Give up / surrender', answer: 'YIELD', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #4',
        solution: [
            ['F', 'L', 'I', 'N', 'T'],
            ['L', null, 'N', null, 'A'],
            ['O', 'R', 'K', 'E', 'Y'],
            ['O', null, 'S', null, 'L'],
            ['D', 'O', 'S', 'E', 'S'],
        ],
        clues: [
            { number: '1', clue: 'Spark-making stone', answer: 'FLINT', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Monkey wrench brand / island group', answer: 'ORKEY', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Medication amounts', answer: 'DOSES', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'River overflow', answer: 'FLOOD', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Shade of deep blue', answer: 'INKSY', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Price sticker', answer: 'TAELS', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #5',
        solution: [
            ['G', 'R', 'A', 'S', 'P'],
            ['L', null, 'G', null, 'I'],
            ['E', 'A', 'G', 'E', 'R'],
            ['A', null, 'S', null, 'O'],
            ['N', 'O', 'S', 'E', 'S'],
        ],
        clues: [
            { number: '1', clue: 'Grip tightly', answer: 'GRASP', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Keen and enthusiastic', answer: 'EAGER', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Smelling organs', answer: 'NOSES', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Lean; lacking fat', answer: 'GLEAN', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'A slow-cooked stew', answer: 'AGSOS', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Whirl or spin', answer: 'PIROS', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #6',
        solution: [
            ['S', 'H', 'A', 'R', 'K'],
            ['T', null, 'L', null, 'N'],
            ['A', 'L', 'O', 'F', 'T'],
            ['R', null, 'N', null, 'S'],
            ['E', 'B', 'E', 'N', 'S'],
        ],
        clues: [
            { number: '1', clue: 'Ocean predator', answer: 'SHARK', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'High in the air', answer: 'ALOFT', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Hard black wood', answer: 'EBENS', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'A celestial body', answer: 'STARE', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Passage in a building', answer: 'ALONE', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Twist of fate', answer: 'KNTSS', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #7',
        solution: [
            ['P', 'R', 'I', 'C', 'E'],
            ['L', null, 'D', null, 'A'],
            ['U', 'N', 'I', 'T', 'S'],
            ['M', null, 'O', null, 'T'],
            ['B', 'I', 'T', 'E', 'S'],
        ],
        clues: [
            { number: '1', clue: 'Cost or fee', answer: 'PRICE', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Segments or modules', answer: 'UNITS', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Chomps with teeth', answer: 'BITES', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'A decorative feather', answer: 'PLUMB', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Gave a thumbs-up to', answer: 'IDIOT', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Simple or basic', answer: 'EASTS', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #8',
        solution: [
            ['T', 'W', 'I', 'R', 'L'],
            ['R', null, 'N', null, 'A'],
            ['U', 'S', 'H', 'E', 'R'],
            ['T', null, 'S', null, 'G'],
            ['H', 'A', 'S', 'T', 'E'],
        ],
        clues: [
            { number: '1', clue: 'Spin or rotate', answer: 'TWIRL', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Cinema guide', answer: 'USHER', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Hurry; urgency', answer: 'HASTE', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Honesty; what is real', answer: 'TRUTH', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Linens or bedding', answer: 'INSHS', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Not narrow', answer: 'LARGE', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #9',
        solution: [
            ['S', 'P', 'A', 'R', 'K'],
            ['C', null, 'X', null, 'N'],
            ['A', 'L', 'L', 'O', 'Y'],
            ['L', null, 'E', null, 'F'],
            ['E', 'R', 'E', 'C', 'T'],
        ],
        clues: [
            { number: '1', clue: 'Ignition flash', answer: 'SPARK', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Metal mixture', answer: 'ALLOY', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Standing upright', answer: 'ERECT', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Weighing instrument', answer: 'SCALE', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Hatchet', answer: 'AXLE', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Story or fable', answer: 'KNYFT', row: 0, col: 4, dir: 'down' },
        ],
    },
    {
        title: 'Mini Crossword #10',
        solution: [
            ['C', 'H', 'E', 'S', 'S'],
            ['L', null, 'A', null, 'T'],
            ['O', 'A', 'R', 'S', 'E'],
            ['V', null, 'T', null, 'E'],
            ['E', 'L', 'H', 'E', 'R'],
        ],
        clues: [
            { number: '1', clue: 'Board game for two', answer: 'CHESS', row: 0, col: 0, dir: 'across' },
            { number: '4', clue: 'Rowing implements', answer: 'OARSE', row: 2, col: 0, dir: 'across' },
            { number: '5', clue: 'Alternatively', answer: 'ELHER', row: 4, col: 0, dir: 'across' },
            { number: '1', clue: 'Leafy vegetable', answer: 'CLOVE', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'Ground shaker', answer: 'EARTH', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Calm or composed', answer: 'STEER', row: 0, col: 4, dir: 'down' },
        ],
    },
];

// ── Deterministic date-seeded puzzle selection ────────────────────────────────
// We use a simple hash of the YYYY-MM-DD string so the same date always
// returns the same puzzle, but adjacent days reliably differ.
function dateHash(dateStr: string): number {
    let h = 5381;
    for (let i = 0; i < dateStr.length; i++) {
        h = ((h * 33) ^ dateStr.charCodeAt(i)) >>> 0;
    }
    return h;
}

export function getTodaysPuzzle(): CrosswordPuzzle {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayKey = `${yyyy}-${mm}-${dd}`;

    const idx = dateHash(todayKey) % PUZZLE_BANK.length;
    return { ...PUZZLE_BANK[idx], date: todayKey };
}

// ── Persistence ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'pera_crossword_results';

export interface CrosswordResult {
    date: string;
    solveMs: number;
    completed: boolean;
    startedAt: number;
    gridState?: (string | null)[][];
    elapsedSaved?: number;
    hintsUsed?: number;
}

export function loadResult(puzzleDate: string): CrosswordResult | null {
    try {
        const map = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return map[puzzleDate] || null;
    } catch { return null; }
}

export function saveResult(result: CrosswordResult) {
    try {
        const map = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        map[result.date] = result;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch { }
}

export function formatTime(ms: number) {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

// Mock friend leaderboard
export const FRIEND_TIMES = [
    { name: 'Alice.algo', time: 95000 },  // 1:35
    { name: 'CryptoKing', time: 142000 },  // 2:22
    { name: 'Satoshi_Fan', time: 203000 },  // 3:23
];
