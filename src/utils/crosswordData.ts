// Daily Mini Crossword — Puzzle Data
// Diamond-black pattern: blacks at (1,1),(1,3),(3,1),(3,3)
// Across clues: rows 0, 2, 4 | Down clues: cols 0, 2, 4

export interface CrosswordClue { number: string; clue: string; answer: string; row: number; col: number; dir: 'across' | 'down'; }

export interface CrosswordPuzzle {
    date: string; // YYYY-MM-DD key
    title: string;
    // 5x5 grid: null=black, letter=answer
    solution: (string | null)[][];
    clues: CrosswordClue[];
}

export const PUZZLES: CrosswordPuzzle[] = [
    {
        date: 'puzzle-0',
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
        date: 'puzzle-1',
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
        date: 'puzzle-2',
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
            { number: '1', clue: 'Follow a path or trail', answer: 'TRACE', row: 0, col: 0, dir: 'down' },
            { number: '2', clue: 'A home or dwelling', answer: 'ABODE', row: 0, col: 2, dir: 'down' },
            { number: '3', clue: 'Give up / surrender', answer: 'YIELD', row: 0, col: 4, dir: 'down' },
        ],
    },
];

export function getTodaysPuzzle(): CrosswordPuzzle {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return PUZZLES[dayOfYear % PUZZLES.length];
}

const STORAGE_KEY = 'pera_crossword_results';
export interface CrosswordResult { date: string; solveMs: number; completed: boolean; startedAt: number; }

export function loadResult(puzzleDate: string): CrosswordResult | null {
    try { const map = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); return map[puzzleDate] || null; } catch { return null; }
}
export function saveResult(result: CrosswordResult) {
    try { const map = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); map[result.date] = result; localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch { }
}
export function formatTime(ms: number) {
    const s = Math.floor(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

// Mock friend leaderboard
export const FRIEND_TIMES = [
    { name: 'Alice.algo', time: 95000 },   // 1:35
    { name: 'CryptoKing', time: 142000 },  // 2:22
    { name: 'Satoshi_Fan', time: 203000 }, // 3:23
];
